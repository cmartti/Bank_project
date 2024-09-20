from flask import Flask, render_template, request, redirect, jsonify
from flask_cors import CORS
import psycopg2
from datetime import date


app = Flask(__name__)

CORS(app)

cors = CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

config = {
    "host": "localhost",
    "database":"postgres",
    "user": "postgres",
    "password": "christoffer123"}

@app.route('/')
def index():
    return "First page"

#Get all banks
@app.route('/api/accounts', methods=['GET'])
def getAccounts():
    try:
        connection = psycopg2.connect(**config)
        cursor = connection.cursor()
        cursor.execute("""SELECT c.id, c.customer_name, c.customer_lastname, 
                       a.cash, a.invested FROM CUSTOMERS AS c, Account AS a
                       WHERE c.id = a.customer_id;""")
        data = cursor.fetchall()
        cursor.close()
        connection.close()
        lables = list(("id","name","lastname","cash","invested"))
        output = list()
        for tup in data:
            output.append(dict(zip(lables, tup)))
        return jsonify(output)

    except Exception as exp:
        return jsonify({"error": str(exp)})
    
@app.route('/api/customers', methods=['GET'])
def getCustomers():
    try:
        connection = psycopg2.connect(**config)
        cursor = connection.cursor()
        cursor.execute("""SELECT c.id, c.customer_name, c.customer_lastname, c.country
                        FROM CUSTOMERS AS c""")
        data = cursor.fetchall()
        cursor.close()
        connection.close()
        lables = list(("id","name","lastname","country"))
        output = list()
        for tup in data:
            output.append(dict(zip(lables, tup)))
        return jsonify(output)

    except Exception as exp:
        return jsonify({"error": str(exp)})
    


    
@app.route('/api/customers/add', methods=["POST"])
def addCustomer():
    try:
        connection = psycopg2.connect(**config)
        cursor = connection.cursor()
        
        toAdd = request.get_json()

        name = toAdd["name"]
        lastname = toAdd["lastname"]
        country = toAdd["country"]
        print(name,lastname,country)
        if name != "" and lastname != "" and country != "":
            cursor.execute("INSERT INTO CUSTOMERS (customer_name, customer_lastname, country) VALUES (%s, %s, %s);", (name, lastname, country,))
            connection.commit()
            cursor.close()
            connection.close()
        
            return jsonify({"message": "customer added!"})
        else:
            return jsonify({"message": "empty customer"})

    except Exception as exp:
        return jsonify({"error": str(exp)})



@app.route('/api/customers/delete/<string:id>', methods=["DELETE"])
def delCustomer(id):
    try:
        connection = psycopg2.connect(**config)
        cursor = connection.cursor()        

        cursor.execute("DELETE FROM CUSTOMERS WHERE id = %s;", (id,))
        connection.commit()
        cursor.close()
        connection.close()

        return jsonify({"message": "customer added!"})

    except Exception as exp:
        return jsonify({"error": str(exp)})





@app.route('/api/balance/<string:id>', methods=['GET'])
def getBalance(id):
    try:
        connection = psycopg2.connect(**config)
        cursor = connection.cursor()
        cursor.execute("""SELECT cash 
                       FROM Account
                       WHERE customer_id = %s;""", (id,))
        data = cursor.fetchall()
        cursor.close()
        connection.close()
        lables = list("cash")
        output = list()
        for tup in data:
            output.append(dict(zip(lables, tup)))
        print((output))
        return jsonify(output)

    except Exception as exp:
        return jsonify({"error": str(exp)})




@app.route('/api/balance/deposit/<string:id>', methods=['PUT'])
def deposit(id):
    try:
        connection = psycopg2.connect(**config)
        cursor = connection.cursor()
        
        toUpdate = request.get_json()

        cursor.execute("""UPDATE ACCOUNT
                       SET cash = cash + %s
                       WHERE customer_id = %s
                       ;""", (int(toUpdate["deposit"]), id, ))
        
        connection.commit()
        cursor.close()
        connection.close()

        return jsonify({"message": "balance updated!"})

    except Exception as exp:
        return jsonify({"error": str(exp)})


@app.route('/api/balance/withdraw/<string:id>', methods=['PUT'])
def withdraw(id):
    try:
        connection = psycopg2.connect(**config)
        cursor = connection.cursor()
        
        toUpdate = request.get_json()

        cursor.execute("""UPDATE ACCOUNT
                       SET cash = cash - %s
                       WHERE customer_id = %s
                       ;""", (int(toUpdate["withdraw"]), id, ))
        
        connection.commit()
        cursor.close()
        connection.close()

        return jsonify({"message": "balance updated!"})

    except Exception as exp:
        return jsonify({"error": str(exp)})



@app.route('/api/portfolio/<string:id>', methods=['GET'])
def portfolio(id):
    try:
        connection = psycopg2.connect(**config)
        cursor = connection.cursor()        

        cursor.execute("""SELECT c.customer_name, c.customer_lastname, 
                       p.bought_type, COUNT(p.amount), SUM(p.amount)
                        FROM CUSTOMERS AS c, Portfolio AS p
                        WHERE c.id = %s AND c.id = p.customer_id
                        GROUP BY p.bought_type, c.customer_name, c.customer_lastname;""", (id,))
        data = cursor.fetchall()
        cursor.close()
        connection.close()
        lables = list(("name","lastname","type","quantity","value"))
        output = list()
        for tup in data:
            output.append(dict(zip(lables, tup)))
        return jsonify(output)

    except Exception as exp:
        return jsonify({"error": str(exp)})


@app.route('/api/portfolio/holder/<string:id>', methods=['GET'])
def showPortfolio(id):
    try:
        connection = psycopg2.connect(**config)
        cursor = connection.cursor()        

        cursor.execute("""SELECT customer_name, customer_lastname 
                       FROM Customers WHERE id = %s;""", (id,))
        data = cursor.fetchall()
        cursor.close()
        connection.close()
        lables = list(("name","lastname"))
        output = list()
        for tup in data:
            output.append(dict(zip(lables, tup)))
        return jsonify(output)

    except Exception as exp:
        return jsonify({"error": str(exp)})
    

@app.route('/api/portfolio/add', methods=["POST"])
def addHolding():
    try:
        connection = psycopg2.connect(**config)
        cursor = connection.cursor()

        toAdd = request.get_json()

        custid = int(toAdd["custid"])
        bought_type = toAdd["bought_type"]
        amount = float(toAdd["amount"])
        print(custid, bought_type, amount)

        if custid != "" and bought_type != "" and amount != "":
            cursor.execute("INSERT INTO Portfolio (customer_id, bought_type, amount, transaction_date) VALUES (%s, %s, %s, CURRENT_DATE);", (custid, bought_type, amount,))
            connection.commit()
            cursor.close()
            connection.close()

            return jsonify({"message": "added holding"})
        else:
            return jsonify({"message": "empty holding"})
        
    except Exception as exp:
        return jsonify({"error": str(exp)})




if __name__ == "__main__":
    app.run(debug=True)


