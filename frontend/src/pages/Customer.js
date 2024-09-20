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
    console.log("success" + data)
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

function Customers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/customers", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setCustomers(data); // Assuming data is an array of objects with a 'name' property for each bank
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
      });
  }, []);

  return (
    <>
      <div className="customerInfo">
        <table>
          <tr>
            <th>Customer id</th>
            <th>Name</th>
            <th>Country</th>
          </tr>
          {customers.length === 0 ? (
            <p>Loading data...</p>
          ) : (
            customers.map((customer, i) => {
              return (
                <tr key={i}>
                  <td>{customer.id}</td>
                  <td>
                    {customer.name} {customer.lastname}
                  </td>
                  <td>{customer.country}</td>
                </tr>
              );
            })
          )}
        </table>
      </div>
    </>
  );
}

////////////onClick
function CustomerPage() {
  const [change, setChange] = useState({ name: "", lastname: "", country: "" });

  const [del, setDel] = useState({ id: "" }, []);

  const handleAddCustomer = () => {
    AddCustomer(change);
    // Optionally, clear the input fields after adding the customer
    setChange({ name: "", lastname: "", country: "" });
    window.location.reload(false);
  };

  const handleDeleteCustomer = () => {
    DelCustomer(del["id"]);
    // Optionally, clear the input fields after deleting the customer
    setDel({ id: "" });
    window.location.reload(false);
  };

  return (
    <div className="bankPage">
      <h1>List of customers:</h1>
      <Customers />
      <div className="editCustomers">
        <p>Add customer</p>
        <input
          type={"text"}
          value={change.name}
          placeholder="Enter name"
          onChange={(event) => {
            setChange({ ...change, name: event.target.value });
          }}
        />
        <input
          type={"text"}
          value={change.lastname}
          placeholder="Enter lastname"
          onChange={(event) => {
            setChange({ ...change, lastname: event.target.value });
          }}
        />
        <input
          type={"text"}
          value={change.country}
          placeholder="Enter country"
          onChange={(event) => {
            setChange({ ...change, country: event.target.value });
          }}
        />
        <button onClick={handleAddCustomer}>
          Add customer with these attributes
        </button>

        <p>Delete customer</p>
        <input
          type={"text"}
          value={del.id}
          placeholder="Enter id"
          onChange={(event) => {
            setDel({ ...del, id: event.target.value });
          }}
        />

        <button onClick={handleDeleteCustomer}>Delete this customer</button>
      </div>
    </div>
  );
}

export { CustomerPage, Customers };
