import React, { Component } from "react";
import Axios from "axios";
import "./home.css";

export default class home extends Component {
  state = {
    data: ""
  };
  componentDidMount() {
    Axios.get(
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
        this.setState({ data: holder });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <div className="cards-container">
        {this.state.data && (
          <>
            <ul className="gallery">
              {this.state.data.map((item, index) => (
                <>
                  <li
                    className="gallery-item"
                    key={index + Math.floor(Math.random() * 101).toString()}
                  >
                    <img
                      src={item.img}
                      key={index + Math.floor(Math.random() * 101).toString()}
                      alt="avatar"
                    />
                    <span className="hidden-not-hover">
                      <i className="fas fa-heart icons-hover">{""}</i>
                      <i className="fas fa-comment icons-hover">
                        {" "}
                        {item.comments.length}
                      </i>
                    </span>
                  </li>
                  {/* <li>{item.time}</li>
                  <li key={index + Math.floor(Math.random() * 101).toString()}>
                    {item.content}
                  </li>
                  <li key={index + Math.floor(Math.random() * 101).toString()}>
                    {item.comments}
                  </li> */}
                </>
              ))}
            </ul>
          </>
        )}
        <>{!this.state.data && <h1>Loading</h1>}</>
      </div>
    );
  }
}
