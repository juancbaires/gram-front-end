import React, { Component } from "react";
import logo from "../logo.svg";
export default class signup extends Component {
  render() {
    return (
      <div>
        <div className="login-box">
          <img src={logo} alt="avatar" className="avatar" />
          <h1>Signup</h1>
          <form action="">
            {/* <p>Username</p> */}
            <input type="text" name="" placeholder="Username" />
            {/* <p>Password</p> */}
            <input type="password" name="" placeholder="Password" />
            <input type="submit" name="" value="Log In" />
            <a href="/">Lost your password</a>
            <br />
            <a href="/">Create a new account</a>
          </form>
        </div>
      </div>
    );
  }
}
