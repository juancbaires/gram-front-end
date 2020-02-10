import React from "react";
import "./App.css";
import Header from "./header";
import Splash from "./splash";
import { Switch, Route } from "react-router";
import Register from "./assets/register";
function App() {
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

export default App;
