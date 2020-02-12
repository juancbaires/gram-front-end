import React, { Component } from "react";
import "./App.css";
import Header from "./header";
import Splash from "./splash";
import { Switch, Route } from "react-router";
import Register from "./assets/register";
import decode from "jwt-decode";
import axios from "axios";
export default class App extends Component {
  state = {
    isLoggedIn: false,
    user: "",
    error: ""
  };

  componentDidMount() {
    this.setuser();
  }
  setuser = () => {
    if (localStorage.token) {
      this.setState({ isLoggedIn: true, user: decode(localStorage.token) });
    }
  };

  handleAuth = async oldUser => {
    try {
      const userData = await axios.post("http://localhost:3000/users/login", {
        ...oldUser
      });
      const { data } = userData;
      localStorage.token = data.token;
      this.setState({ isLoggedIn: true });
      this.props.history.push("/");
    } catch (error) {
      this.setState({ isLoggedIn: false, error });
    }
  };

  createUser = async newUser => {
    try {
      const userData = await axios.post("http://localhost:3000/users/signup", {
        ...newUser
      });
      const { data } = userData;
      localStorage.token = data.token;
      this.setState({ isLoggedIn: true });
      this.props.history.push("/");
    } catch (error) {
      this.setState({ error });
    }
  };

  render() {
    return (
      <div className="App">
        <Header></Header>
        <main>
          <Switch>
            <Route
              path="/register"
              render={() => (
                <Register
                  {...this.state}
                  handleAuth={this.createUser}
                ></Register>
              )}
            ></Route>
            <Route path="/" component={Splash}></Route>
          </Switch>
        </main>
      </div>
    );
  }
}
