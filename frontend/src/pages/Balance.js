import React from "react";
import "./portfolioStyle.css";
import { useEffect, useState, useCallback } from "react";
import "../components/index.css";
import "./formating.css";
import HandleClick from "../components/HandleClick";

function Counter({ callback }) {
  const [contamount, setAmount] = useState(0);

  return (
    <>
      <div className="amount-container">
        <p className="amount-display">Amount: $ {contamount}</p>

        <button
          className="amount-button"
          onClick={() =>
            setAmount((prevAmount) => Math.max(0, prevAmount - 100))
          }
        >
          -100
        </button>

        <button
          className="amount-button"
          onClick={() =>
            setAmount((prevAmount) => Math.max(0, prevAmount - 10))
          }
        >
          -10
        </button>

        <button
          className="amount-button"
          onClick={() => setAmount((prevAmount) => Math.max(0, prevAmount - 1))}
        >
          -1
        </button>

        <button
          className="amount-button"
          onClick={() => setAmount((prevAmount) => 0)}
        >
          Reset
        </button>

        <button
          className="amount-button"
          onClick={() => setAmount((prevAmount) => prevAmount + 1)}
        >
          +1
        </button>

        <button
          className="amount-button"
          onClick={() => setAmount((prevAmount) => prevAmount + 10)}
        >
          +10
        </button>

        <button
          className="amount-button"
          onClick={() => setAmount((prevAmount) => prevAmount + 100)}
        >
          +100
        </button>
        <div className="confirmAmount">
          <button
            className="confirmButton"
            onClick={() => {
              callback(contamount);
            }}
          >
            Confirm Amount
          </button>
        </div>
      </div>
    </>
  );
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
    <div className="balanceOf">
      {customer.length === 0 ? (
        <>
          <h1>Owner Of Account:</h1>
          <p>ID not found</p>
        </>
      ) : (
        <>
          <h1>Owner Of Account:</h1>
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

function Balance({ id }) {
  const [balance, setBalance] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/balance/" + id, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setBalance(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching portfolio:", error);
      });
  }, [id]);

  return (
    <div className="balanceBox">
      <h1>Balance:</h1>

      {balance.length === 0 ? (
        <p>Try different ID</p>
      ) : (
        balance.map((amount, i) => <p key={i}>$ {amount.c}</p>)
      )}
    </div>
  );
}
/*
function UpBalance() {
  return <div></div>;
}

async function UpBalance({ id }) {
  await fetch(
    "http://127.0.0.1:5000/api/customers/add",
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    },
    console.log("success")
  ).catch((error) => {
    console.log("Error fetching data:", error);
  });
}
*/

async function DepositBalance(row) {
  await fetch("http://127.0.0.1:5000/api/balance/deposit/" + row["id"], {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(row),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log("Balance updated", result);
    })

    .catch((error) => {
      console.log("Something went wrong", error);
    });
}

async function WithdrawBalance(row) {
  await fetch("http://127.0.0.1:5000/api/balance/withdraw/" + row["id"], {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(row),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log("Balance updated", result);
    })

    .catch((error) => {
      console.log("Something went wrong", error);
    });
}

function SeeBalance() {
  const [id, setId] = useState("");
  const showPortfolio = () => {
    setId("");
    // Optionally, clear the input fields after displaying portfolio
  };
  const [amount, setAmount] = useState(0);
  const callbackAmount = (value) => {
    setAmount(value);
    console.log("New amount is: " + value);
  };

  const handleDeposit = () => {
    DepositBalance({ id: id, deposit: amount });
    alert("Money deposited" + id + amount);
  };

  const handleWithdraw = () => {
    WithdrawBalance({ id: id, withdraw: amount });
    alert("Money withdrawn");
  };

  /*const callbackAmount = useCallback((value) => {
    setAmount(value); // Update the amount state when the callback is called
  }, []);*/

  return (
    <>
      <div>
        <div className="balanceInput">
          <p>Enter your ID to see your balance</p>
          <input
            type={"text"}
            value={id}
            placeholder="Enter id"
            onChange={(event) => setId(event.target.value)}
          />
        </div>
        {id && (
          <>
            <Holder id={id} />
            <Balance id={id} />
          </>
        )}
      </div>
      {id && (
        <>
          <div className="changeBalance">
            <h3>Confirmed Amount: ${amount}</h3>

            <Counter callback={callbackAmount} />

            <h2>Do you wish to deposit or withdraw money?</h2>
          </div>
          <div className="confirmChange">
            <button onClick={handleDeposit}>Deposit</button>
            <button onClick={handleWithdraw}>Withdraw</button>
          </div>
        </>
      )}
    </>
  );
}

export { Balance, SeeBalance };
