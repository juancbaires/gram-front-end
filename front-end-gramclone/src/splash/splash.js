import React from "react";
import logo from "../logo.svg";
import "../splash/splash.css";
import { Link } from "react-router-dom";
export default function splash() {
  return (
    <div className="login-box">
      <img src={logo} alt="avatar" className="avatar" />
      <h1>Login</h1>
      <form action="">
        {/* <p>Username</p> */}
        <input type="text" name="" placeholder="Username" />
        {/* <p>Password</p> */}
        <input type="password" name="" placeholder="Password" />
        <input type="submit" name="" value="Log In" />
        <a href="/">Lost your password</a>
        <br />
        <Link to="/signup">
          <span>Create a new account</span>
        </Link>
      </form>
    </div>
  );
}
