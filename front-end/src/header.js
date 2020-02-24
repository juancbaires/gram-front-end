import React, { Component } from "react";
import "./header.css";
import { NavLink } from "react-router-dom";
export default class header extends Component {
  clearUser = e => {
    // e.preventDefault();
    this.props.logOff(localStorage.token);
  };

  render() {
    const { isLoggedIn } = this.props;
    return (
      <div className="navigation">
        <NavLink to="/" className="logo_name">
          PixaShare
        </NavLink>
        {isLoggedIn ? (
          <>
            <NavLink to={`/profile/${this.props.data}`}>Profile</NavLink>
            <a onClick={this.clearUser} className="signup-btn" href="/">
              Log Out
            </a>
          </>
        ) : (
          <>
            <NavLink to="/login">Sign In</NavLink>
            <NavLink to="/register" className="signup-btn">
              Sign Up
            </NavLink>
          </>
        )}
      </div>
    );
  }
}
