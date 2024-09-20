import React, { useState } from "react";
import "./index.css";

import email from "../images/email.png";
import password from "../images/password.png";
import person from "../images/person.png";

export const LoginSignup = () => {
  const [action, setAction] = useState("Sign Up");

  return (
    <div className="loginContainer">
      <div className="loginHeader">
        <div className="loginText">{action}</div>
        <div className="loginUnderline"></div>
      </div>
      <div className="loginInputs">
        {action === "Log In" ? (
          <div />
        ) : (
          <div className="loginInput">
            <img src={person} alt="" />
            <input type="text" placeholder="Name" />
          </div>
        )}
        <div className="loginInput">
          <img src={email} alt="" />
          <input type="email" placeholder="Email" />
        </div>

        <div className="loginInput">
          <img src={password} alt="" />
          <input type="password" placeholder="Password" />
        </div>
      </div>
      <div className="loginSubmit-container">
        <div
          className={action === "Log In" ? "submit gray" : "submit"}
          onClick={() => {
            setAction("Sign Up");
          }}
        >
          Sign Up
        </div>
        <div
          className={action === "Sign Up" ? "submit gray" : "submit"}
          onClick={() => {
            setAction("Log In");
          }}
        >
          Log In
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
