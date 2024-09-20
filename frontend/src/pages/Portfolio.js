import React from "react";
import "./portfolioStyle.css";
import { useEffect, useState } from "react";

function AddHolding(data) {
  fetch(
    "http://127.0.0.1:5000/api/portfolio/add",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    },
    console.log(JSON.stringify(data)),
    console.log("Added holding" + data)
  ).catch((error) => {
    console.log("Error adding holding", error);
  });
}

function Holder({ id }) {
  const [customer, setCustomer] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/portfolio/holder/" + id, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setCustomer(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
      });
  }, [id]);

  return (
    <div className="portfolioHolder">
      {customer.length === 0 ? (
        <>
          <h1>Holder of portfolio</h1>
          <p>ID not found</p>
        </>
      ) : (
        <>
          <h1>Holder of portfolio</h1>
          {customer.map((holder, i) => (
            <p key={i}>
              {holder.name} {holder.lastname}
            </p>
          ))}
        </>
      )}
    </div>
  );
}

function Portfolio({ id }) {
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/portfolio/" + id, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setPortfolio(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching portfolio:", error);
      });
  }, [id]);

  return (
    <div className="portfolioTable">
      <h1>Portfolio</h1>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Quantity</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {portfolio.length === 0 ? (
            <tr>
              <td colSpan="3">---</td>
            </tr>
          ) : (
            portfolio.map((stock, i) => (
              <tr key={i}>
                <td>{stock.type}</td>
                <td>{stock.quantity}</td>
                <td>{stock.value}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

function SeePortfolio() {
  const [id, setId] = useState("");
  const [add, setAdd] = useState({ custid: "", bought_type: "", amount: "" });

  const showPortfolio = () => {
    setId("");
    // Optionally, clear the input fields after displaying portfolio
  };
  const handleHolding = () => {
    console.log(add);
    AddHolding(add);
    alert("Portfolio updated, refreshing");
    window.location.reload(false);
  };

  return (
    <>
      <div className="bigRock">
        <div className="petRock">
          <p>Enter your ID to see your portfolio</p>
          <input
            type="text"
            value={id}
            placeholder="Enter id"
            onChange={(event) => {
              setId(event.target.value);
              setAdd({ ...add, custid: event.target.value });
              console.log(id);
              console.log(add["custid"]);
            }}
          />
        </div>
        {id && (
          <>
            <Holder id={id} />
            <Portfolio id={id} />
            <div className="positionText">
              {" "}
              <p>Add position:</p>
            </div>
          </>
        )}
      </div>

      <div className="addHolding">
        {add.custid && (
          <>
            <label>
              <p>Type of position: </p>

              <select
                name="selectedType"
                value={add.bought_type}
                onChange={(event) => {
                  setAdd({ ...add, bought_type: event.target.value });
                }}
              >
                <option value="">Select type:</option>
                <option value="Stock">Stock</option>
                <option value="Bond">Bond</option>
                <option value="ETF">ETF</option>
                <option value="Crypto">Crypto</option>
              </select>
            </label>
            <p>Enter amount: </p>
            <input
              type={"text"}
              value={add.amount}
              placeholder="Enter amount"
              onChange={(event) => {
                setAdd({ ...add, amount: event.target.value });
              }}
            />
            <button onClick={handleHolding}>Add</button>{" "}
          </>
        )}
      </div>
    </>
  );
}

export default SeePortfolio;

export { Portfolio, SeePortfolio };
