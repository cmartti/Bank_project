import React from "react";

function AddCustomer(data) {
    fetch("http://127.0.0.1:5000/api/customers/add", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    }
    ).catch((error) => {
        console.log("Error fetching data:", error)
    }
    )
}



function DelCustomer(data) {
    fetch("http://127.0.0.1:5000/api/customers/delete", {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    }
    ).then((response) => response.json())
    .catch((error) => {
        console.log("Error deleting data:", error)
    }
    )
}





export default DelCustomer;
