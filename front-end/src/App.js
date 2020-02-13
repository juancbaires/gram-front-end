import React, { Component } from "react";
import "./App.css";
import Header from "./header";
import Splash from "./splash";
import { Switch, Route, withRouter } from "react-router-dom";

import { createBrowserHistory } from "history";

import Register from "./assets/register";
import decode from "jwt-decode";
import axios from "axios";
import Login from "./assets/login";
import Home from "./assets/authorized/home";

const history = createBrowserHistory();
class App extends Component {
  state = {
    isLoggedIn: false,
    user: "",
    error: "",
    data: ""
  };

  // check to see of user is logged out of site, if so set user
  componentDidMount() {
    this.setuser();
  }
  // handle logout of user
  logOff = async token => {
    localStorage.clear();
    try {
      await axios.post(
        "http://localhost:3001/users/logout/",
        {},
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );
      this.setState({
        isLoggedIn: false,
        user: "",
        error: "",
        data: ""
      });

      history.push("/");
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  setuser = () => {
    if (localStorage.token) {
      this.setState({ isLoggedIn: true, user: decode(localStorage.token) });
    }
  };

  handleAuth = async oldUser => {
    try {
      const userData = await axios.post("http://localhost:3001/users/login", {
        ...oldUser
      });
      const { data } = userData;
      localStorage.token = data.token;
      this.setState({ isLoggedIn: true, data });
      history.push("/");
    } catch (error) {
      this.setState({ isLoggedIn: false, error });
    }
  };

  createUser = async newUser => {
    try {
      const userData = await axios.post("http://localhost:3001/users/signup", {
        ...newUser
      });
      const { data } = userData;
      localStorage.token = data.token;
      this.setState({ isLoggedIn: true, data });
      history.push("/");
    } catch (error) {
      this.setState({ error });
    }
  };

  render() {
    return (
      <div className="App">
        <Header {...this.state} logOff={this.logOff}></Header>
        <main>
          <Switch>
            {this.state.isLoggedIn && (
              <Route path="/" render={() => <Home></Home>}></Route>
            )}
            <Route
              path="/register"
              render={() => (
                <Register
                  {...this.state}
                  createUser={this.createUser}
                ></Register>
              )}
            ></Route>
            <Route
              path="/login"
              render={() => (
                <Login {...this.state} handleAuth={this.handleAuth}></Login>
              )}
            ></Route>
            <Route path="/" component={Splash}></Route>
          </Switch>
        </main>
      </div>
    );
  }
}

export default withRouter(App);
