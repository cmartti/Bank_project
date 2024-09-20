import React from "react";

async function AddHolding(data) {
  await fetch(
    "http://127.0.0.1:5000/api/portfolio/add",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    },
    console.log("Added holding" + data)
  ).catch((error) => {
    console.log("Error adding holding", error);
  });
}

export default AddHolding;
