import React, { Component } from "react";
import "./App.css";
import Header from "./header";
import Splash from "./splash";
import { Switch, Route } from "react-router";
import Register from "./assets/register";
import decode from "jwt-decode";
export default class App extends Component {
  state = {
    isLoggedIn: false,
    user: ""
  };
  setuser = () => {
    if (localStorage.token) {
      this.setState({ isLoggedIn: true, user: decode(localStorage.token) });
    }
  };

  handleLoggedIn = oldUser => {};
  render() {
    return (
      <div className="App">
        <Header></Header>
        <Switch>
          <Route path="/register" component={Register}></Route>
          <Route path="/" component={Splash}></Route>
        </Switch>
      </div>
    );
  }
}
