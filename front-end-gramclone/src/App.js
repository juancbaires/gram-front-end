import React, { Component } from "react";
import "./App.css";
import Splash from "../src/splash/splash";
import Signup from "../src/signup/signup";
import { Route, Switch } from "react-router-dom";
import Axios from "axios";

export default class App extends Component {
  state = {
    isLoggedIn: false,
    user: ""
  };
  componentDidMount() {
    this.getjoke();
  }
  getjoke = async () => {
    try {
      const response = await Axios.get(
        "https://icanhazdadjoke.com/search?term=hipster",
        {
          headers: {
            Accept: "application/json"
          }
        }
      );
      const { data } = response;
      const { results } = data;
      console.log(...results);
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return (
      <div className="App">
        {!this.state.isLoggedIn && (
          <h3>This Is The Gram! Comment, Share and Like Photos</h3>
        )}
        <Switch>
          <Route path="/signup" component={() => <Signup></Signup>}></Route>

          {!this.state.isLoggedIn && (
            <Route path="/" component={() => <Splash></Splash>}></Route>
          )}
        </Switch>
      </div>
    );
  }
}
