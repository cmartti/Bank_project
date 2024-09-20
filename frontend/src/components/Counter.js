import { useState, useEffect } from "react";
import "./index.css";

const Counter = () => {
  const [contamount, setAmount] = useState(0);

  return (
    <div className="amount-container">
      <p className="amount-display">Amount: {contamount}</p>

      <button
        className="amount-button"
        onClick={() => setAmount((prevAmount) => Math.max(0, prevAmount - 100))}
      >
        -100
      </button>

      <button
        className="amount-button"
        onClick={() => setAmount((prevAmount) => Math.max(0, prevAmount - 10))}
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
    </div>
  );
};

export default Counter;
