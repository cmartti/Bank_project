import Card from "../components/card";
import React from "react";
import { useEffect, useState } from "react";
import "../components/index.css";
import "./formating.css";

async function AddCustomer(data) {
  await fetch(
    "http://127.0.0.1:5000/api/customers/add",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    },
    console.log("suces")
  ).catch((error) => {
    console.log("Error fetching data:", error);
  });
}

function DelCustomer(id) {
  fetch("http://127.0.0.1:5000/api/customers/delete/" + id, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log("Error deleting data:", error);
    });
}

function Accounts() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/accounts", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setAccounts(data); // Assuming data is an array of objects with a 'name' property for each bank
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
      });
  }, []);

  return (
    <>
      <div className="accountInfo">
        <table>
          <tr>
            <th>Customer id</th>
            <th>Name</th>
            <th>Cash</th>
            <th>Invested amount</th>
          </tr>
          {accounts.length === 0 ? (
            <p>Loading data...</p>
          ) : (
            accounts.map((account, i) => {
              return (
                <tr key={i}>
                  <td>{account.id}</td>
                  <td>
                    {account.name} {account.lastname}
                  </td>
                  <td>{account.cash}</td>
                  <td>{account.invested}</td>
                </tr>
              );
            })
          )}
        </table>
      </div>
    </>
  );
}

/* function Banks() {
  const [banks, setBanks] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/banks", {
      method: "GET",
      headers: { "Content-Type": "applications/json" },
    })
      .then((response) => response.json())
      .then((banks) => {
        setBanks(banks);
        console.log(banks);
      });
  }, []);

  return (
    <div className="banks">
      {typeof banks.bank === "undefined" ? (
        <p>Loading data...</p>
      ) : (
        banks.bank.map((bank, i) => <p key={i}>{bank}</p>)
      )}
    </div>
  );
} */
/*
function CustomerPage() {
  const [change, setChange] = useState({ name: "", lastname: "", country: "" });

  return (
    <div className="bankPage">
      <h1>List of customers:</h1>
      <Customers />
      <div className="editCustomers">
        <p>Add or delete customer</p>
        <input
          type={"text"}
          value={change.name}
          placeholder="Enter name"
          onChange={(event) => {
            setChange(event.target.value);
          }}
        />
        <input
          type={"text"}
          value={change.lastname}
          placeholder="Enter lastname"
          onChange={(event) => {
            setChange(event.target.value);
          }}
        />
        <input
          type={"text"}
          value={change.country}
          placeholder="Enter country"
          onChange={(event) => {
            setChange(event.target.value);
          }}
        />
        <button onClick={AddCustomer(change)}>
          Add customer with these attributes
        </button>
        <button onClick={DelCustomer(change)}>Delete this customer</button>
      </div>
    </div>
  );
}
*/
////////////onClick
function AccountPage() {
  return (
    <div className="accountPage">
      <h1>Accounts of customers:</h1>
      <Accounts />
    </div>
  );
}

export { AccountPage, Accounts };
