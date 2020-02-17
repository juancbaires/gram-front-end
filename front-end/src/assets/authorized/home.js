import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./home.css";

export default class home extends Component {
  state = {
    data: ""
  };

  render() {
    return (
      <div className="cards-container">
        {this.props.posts && (
          <>
            <ul className="gallery">
              {this.props.posts.map((item, index) => (
                <Link to={`/${item._id}`} key={index}>
                  <li className="gallery-item">
                    <img src={item.img} alt="avatar" />
                    <span className="hidden-not-hover">
                      <i className="fas fa-heart icons-hover">{""}</i>
                      <i className="fas fa-comment icons-hover">
                        {" "}
                        {item.comments.length}
                      </i>
                    </span>
                  </li>
                </Link>
              ))}
            </ul>
          </>
        )}
        <>{!this.props.posts && <h1>Loading</h1>}</>
      </div>
    );
  }
}
