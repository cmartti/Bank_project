import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../images/bankpic.jpg";

function Navbar() {
  return (
    <div className="navbar">
      <div className="leftSide">
        <img src={Logo} />
      </div>
      <div className="rightSide">
        <Link to="/">Home</Link>
        <Link to="/customers">Customers</Link>
        <Link to="/accounts">Accounts</Link>
        <Link to="/portfolio">Portfolio</Link>
        <Link to="/balance">Balance</Link>
      </div>
    </div>
  );
}

export default Navbar;
