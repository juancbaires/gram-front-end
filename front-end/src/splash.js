import React, { Component } from "react";
import "./splash.css";
import { NavLink } from "react-router-dom";
export default class splash extends Component {
  render() {
    return (
      <div className="splash">
        <div className="content">
          <p>share, comment and like photos.</p>
          <NavLink className="link" to="/register">
            <button className="button">Register</button>
          </NavLink>
        </div>
      </div>
    );
  }
}
