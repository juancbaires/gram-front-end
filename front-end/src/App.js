import React, { Component } from "react";
import "./App.css";
import Header from "./header";
import Splash from "./splash";
import { Switch, Route } from "react-router-dom";
import Profile from "./assets/authorized/profile";
import Register from "./assets/register";
import decode from "jwt-decode";
import axios from "axios";
import Login from "./assets/login";
import Home from "./assets/authorized/home";
import Singlecard from "./assets/authorized/singlecard";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();
class App extends Component {
  state = {
    isLoggedIn: false,
    user: "",
    error: "",
    data: "",
    posts: ""
  };
  // upload an image and it's content

  handleUpload = (image, content) => {};

  // post to a comment
  postComment = (comment, postID) => {
    axios
      .post(
        `http://localhost:3001/comments/create-comment/${postID}`,
        {
          content: comment.comment
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.token
          }
        }
      )
      .then(res => {
        this.getAllPosts();
        history.push(`/${postID}`);
      })
      .catch(err => console.log(err));
  };

  getAllPosts = () => {
    axios
      .get(
        "http://localhost:3001/posts/allofposts",
        {},
        {
          bearer: {
            Authorization: "Bearer " + localStorage.token
          }
        }
      )
      .then(response => {
        const { data } = response;
        let holder = [...data];
        this.setState({ posts: holder });
      })
      .catch(err => {
        console.log(err);
      });
  };

  // check to see of user is logged into site, if so set user
  componentDidMount() {
    this.setuser();
    this.setUserData();
    this.getAllPosts();
  }
  // get user info like name, email .....
  setUserData = async => {
    try {
      const data = localStorage.getItem("userInfo");
      this.setState({ data });
    } catch (error) {
      console.log({ ERROR: error });
    }
  };
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
      history.push({ pathname: "/", state: this.state.isLoggedIn });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  setuser = async () => {
    if (localStorage.token) {
      try {
        this.setState({
          isLoggedIn: true,
          user: decode(localStorage.token)
        });
      } catch (error) {
        console.log(error, "please log in to set user");
      }
    }
  };

  handleAuth = async oldUser => {
    try {
      const userData = await axios.post("http://localhost:3001/users/login", {
        ...oldUser
      });
      const { data } = userData;
      localStorage.token = data.token;
      localStorage.setItem("userInfo", data.user.username);
      this.setState({ isLoggedIn: true, data });
      this.setuser();
      this.setUserData();
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
      localStorage.setItem("userInfo", data.user.username);
      this.setState({ isLoggedIn: true, data });
      this.setuser();
      this.setUserData();
      history.push("/");
    } catch (error) {
      this.setState({ error });
    }
  };

  render() {
    console.log(history);
    return (
      <Router history={history}>
        <div className="App">
          <Header {...this.state} logOff={this.logOff}></Header>
          <main>
            <Switch>
              {this.state.isLoggedIn && (
                <Switch>
                  <Route
                    exact
                    path="/profile/:username"
                    render={() => (
                      <Profile
                        getposts={this.getAllPosts}
                        handleUpload={this.handleUpload}
                        {...this.state}
                      ></Profile>
                    )}
                  ></Route>
                  <Route
                    exact
                    path="/:id"
                    render={() => (
                      <Singlecard
                        {...this.state}
                        {...this.props}
                        postComment={this.postComment}
                      ></Singlecard>
                    )}
                  ></Route>
                  <Route
                    exact
                    path="/"
                    render={() => <Home {...this.state}></Home>}
                  ></Route>
                </Switch>
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
      </Router>
    );
  }
}

export default App;
