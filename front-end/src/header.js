import React, { Component } from "react";
import "./header.css";

export default class header extends Component {
  render() {
    return (
      <div className="navigation">
        <a className="logo_name" href="#?">
          PixaShare
        </a>

        <a href="#/">Sign In</a>

        <a className="signup-btn" href="#/">
          Sign Up
        </a>
      </div>
    );
  }
}
