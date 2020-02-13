import React, { Component } from "react";
import "./register.css";

export default class register extends Component {
  state = {
    username: "",
    password: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.createUser(this.state);
  };

  render() {
    return (
      <div className="wrapper">
        <section className="form-box">
          <form action="submit" onSubmit={this.handleSubmit}>
            <span
              style={{
                color: "#ff3366",
                fontSize: "32px",
                position: "absolute",
                marginTop: "-38px",
                left: "calc(50% - 14px)"
              }}
              className="form_blocks"
            >
              <i className="fas fa-lock "></i>
            </span>
            <span className="form_blocks">
              <i className="material-icons icons">alternate_email</i>
              <input
                onChange={this.handleChange}
                type="text"
                placeholder="Username"
                name="username"
              />
            </span>
            <span className="form_blocks">
              <i className="material-icons icons">visibility_off</i>
              <input
                onChange={this.handleChange}
                type="password"
                placeholder="Password"
                name="password"
              />
            </span>
            {/* <span className="form_blocks">
              <i className="material-icons icons">person</i>
              <input type="text" placeholder="Your Name" />
            </span> */}
            {/* <span className="form_blocks">
              <i className="material-icons icons">face</i>
              <input type="number" placeholder="Age" min="0" max="100" />
            </span> */}
            {/* this below is the button */}
            <span className="form_blocks">
              <input type="submit" value="SIGN UP" />
            </span>
          </form>
        </section>
      </div>
    );
  }
}
