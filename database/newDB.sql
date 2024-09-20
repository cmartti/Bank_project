

DROP TABLE IF EXISTS Portfolio;
DROP TABLE IF EXISTS Account;
DROP TABLE IF EXISTS Customers;


CREATE TABLE Customers (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(30) NOT NULL,
    customer_lastname VARCHAR(30) NOT NULL,
    country VARCHAR(30) NOT NULL
);

-- Create Account table
CREATE TABLE Account (
    account_id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    invested DECIMAL(10, 2),
    cash DECIMAL(10, 2),
    FOREIGN KEY (customer_id) REFERENCES Customers(id),
    CHECK (cash >= 0), -- Adding CHECK constraint to ensure non-negative balance
    CHECK (invested >= 0)
    
);

-- Create Transactions table with dates
CREATE TABLE Portfolio (
    transaction_id SERIAL PRIMARY KEY,
    customer_id INT,
    bought_type VARCHAR(30) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    transaction_date DATE NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES Customers(id)
);




-- New values for Customers table
INSERT INTO Customers (customer_name, customer_lastname, country) VALUES 
('John', 'Doe', 'USA'),
('Alice', 'Smith', 'Canada'),
('Michael', 'Johnson', 'UK'),
('Emma', 'Brown', 'Australia'),
('Daniel', 'Martinez', 'Spain'),
('Sophia', 'Wilson', 'France'),
('William', 'Taylor', 'Germany'),
('Olivia', 'Anderson', 'Italy'),
('James', 'Thomas', 'Japan'),
('Emily', 'Jackson', 'China'),
('Alexander', 'White', 'Russia'),
('Mia', 'Harris', 'Brazil'),
('Ethan', 'Martin', 'Mexico'),
('Isabella', 'Lee', 'Argentina'),
('Aiden', 'Garcia', 'South Africa');

-- New inserts for Account table
INSERT INTO Account (customer_id, invested, cash) VALUES 
(1, 4350.00, 1000.00),
(2, 4450.00, 2000.00),
(3, 3700.00, 500.00),
(4, 4100.00, 3000.00),
(5, 4200.00, 1500.00),
(6, 3750.00, 1200.00),
(7, 4400.00, 2500.00),
(8, 3200.00, 800.00),
(9, 3900.00, 1800.00),
(10, 3750.00, 1600.00),
(11, 4350.00, 2800.00),
(12, 4050.00, 1900.00),
(13, 3500.00, 1100.00),
(14, 4900.00, 1400.00),
(15, 4200.00, 1700.00);

-- New inserts for Transactions table
INSERT INTO Portfolio (customer_id, bought_type, amount, transaction_date) VALUES 
(1, 'Stock', 950.00, '2024-02-12'),
(2, 'Bond', 1250.00, '2024-02-11'),
(3, 'ETF', 1300.00, '2024-02-10'),
(4, 'Stock', 1850.00, '2024-02-09'),
(5, 'Crypto', 1000.00, '2024-02-08'),
(6, 'Stock', 1450.00, '2024-02-07'),
(7, 'Bond', 1900.00, '2024-02-06'),
(8, 'ETF', 2000.00, '2024-02-05'),
(9, 'Stock', 1150.00, '2024-02-04'),
(10, 'Crypto', 1400.00, '2024-02-03'),
(11, 'Bond', 2200.00, '2024-02-02'),
(12, 'ETF', 1100.00, '2024-02-01'),
(13, 'Stock', 3000.00, '2024-01-31'),
(14, 'Crypto', 1600.00, '2024-01-30'),
(15, 'Bond', 2400.00, '2024-01-29'),
(1, 'ETF', 950.00, '2024-01-28'),
(2, 'Stock', 1700.00, '2024-01-27'),
(3, 'Crypto', 1300.00, '2024-01-26'),
(4, 'Bond', 2100.00, '2024-01-25'),
(5, 'ETF', 1000.00, '2024-01-24'),
(6, 'Crypto', 1450.00, '2024-01-23'),
(7, 'Stock', 1900.00, '2024-01-22'),
(8, 'Bond', 2300.00, '2024-01-21'),
(9, 'ETF', 1150.00, '2024-01-20'),
(10, 'Stock', 2800.00, '2024-01-19'),
(11, 'Crypto', 1650.00, '2024-01-18'),
(12, 'Bond', 2000.00, '2024-01-17'),
(13, 'ETF', 1200.00, '2024-01-16'),
(14, 'Stock', 3200.00, '2024-01-15'),
(15, 'Crypto', 1750.00, '2024-01-14'),
(1, 'Bond', 2400.00, '2024-01-13'),
(2, 'ETF', 1250.00, '2024-01-12'),
(3, 'Stock', 3300.00, '2024-01-11'),
(4, 'Crypto', 1850.00, '2024-01-10'),
(5, 'Bond', 2500.00, '2024-01-09'),
(6, 'ETF', 1300.00, '2024-01-08'),
(7, 'Stock', 3400.00, '2024-01-07'),
(8, 'Crypto', 1900.00, '2024-01-06'),
(9, 'Bond', 2600.00, '2024-01-05'),
(10, 'ETF', 1350.00, '2024-01-04'),
(11, 'Stock', 3500.00, '2024-01-03'),
(12, 'Crypto', 1950.00, '2024-01-02'),
(13, 'Bond', 2700.00, '2024-01-01'),
(14, 'ETF', 1400.00, '2023-12-31'),
(15, 'Stock', 3600.00, '2023-12-30');

-- TRIGGERS?
CREATE OR REPLACE FUNCTION create_account_trigger_function()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO Account (customer_id, invested, cash) VALUES (NEW.id, 0, 0);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION delete_account_trigger_function()
RETURNS TRIGGER AS $$
BEGIN
    DELETE FROM Account WHERE customer_id = OLD.id;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_account_trigger_function()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE Account SET invested = invested + NEW.amount;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for deleting associated account


-- Create trigger
CREATE TRIGGER create_account_trigger
AFTER INSERT ON Customers
FOR EACH ROW
EXECUTE FUNCTION create_account_trigger_function();

CREATE TRIGGER delete_account_trigger
BEFORE DELETE ON Customers
FOR EACH ROW
EXECUTE FUNCTION delete_account_trigger_function();

CREATE TRIGGER update_account_trigger
AFTER INSERT ON Portfolio
FOR EACH ROW
EXECUTE FUNCTION update_account_trigger_function();





















