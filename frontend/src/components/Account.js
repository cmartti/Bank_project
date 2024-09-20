import React from "react";
import { useState, useEffect } from "react";

function Account() {
  const [accounts, setAccounts] = useState();
  const [account, setAccount] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("http://127.0.0.1:5000/api/deposit");
      const jsonResult = await result.json();

      setAccounts(jsonResult);
    };
    fetchData();
  }, []);

  return (
    <div className="account">
      <h2>See your balance</h2>
      <form>
        <label>Enter your full name:</label>
        <input
          type="text"
          required
          value={account}
          onChange={(e) => setAccount(e.target.value)}
        />
      </form>
    </div>
  );
}

export default Account;
