import React, { Component } from "react";
import "./singlecard.css";
import Moment from "react-moment";
export default class Singlecard extends Component {
  state = {
    cardSingle: ""
  };
  componentDidMount() {}
  render() {
    const { posts, location } = this.props;
    if (posts.length > 1) {
      var cardSingle = posts.find(
        card => card._id === location.pathname.replace(location.pathname[0], "")
      );
      console.log(cardSingle.content);
    }
    return (
      <div className="single-container">
        {this.props.posts && (
          <div className="single-wrapper">
            <span
              className="body"
              style={{ backgroundImage: `url(${cardSingle.img})` }}
            ></span>
            <span className="footer">
              <span className="header">
                <i id="round-icon" className="fas fa-user-circle icons"></i>
                {this.props.data}
              </span>
              <div className="comment-wrapper scrollable">
                <span className="comment-card">
                  <i id="round-icon" className="fas fa-user-circle icons"></i>
                  <p>
                    <span className="h3">{this.props.data}</span>{" "}
                    {cardSingle.content}
                  </p>
                </span>
                <span className="comment-card">
                  <i id="round-icon" className="fas fa-user-circle icons"></i>
                  <p>
                    <span className="h3">{this.props.data}</span>{" "}
                    {cardSingle.content}
                  </p>
                </span>
                <span className="comment-card">
                  <i id="round-icon" className="fas fa-user-circle icons"></i>
                  <p>
                    <span className="h3">{this.props.data}</span>{" "}
                    {cardSingle.content}
                  </p>
                </span>
                <span className="comment-card">
                  <i id="round-icon" className="fas fa-user-circle icons"></i>
                  <p>
                    <span className="h3">{this.props.data}</span>{" "}
                    {cardSingle.content}
                  </p>
                </span>
                <span className="comment-card">
                  <i id="round-icon" className="fas fa-user-circle icons"></i>
                  <p>
                    <span className="h3">{this.props.data}</span>{" "}
                    {cardSingle.content}
                  </p>
                </span>
                <span className="comment-card">
                  <i id="round-icon" className="fas fa-user-circle icons"></i>
                  <p>
                    <span className="h3">{this.props.data}</span>{" "}
                    {cardSingle.content}
                  </p>
                </span>
              </div>
              <div className="form">
                <span className="card-icons">
                  <i className="far fa-heart"></i>
                  <i className="far fa-comment"></i>
                  <i className="fab fa-telegram-plane"></i>
                  <i className="far fa-bookmark last-icon-right"></i>
                  <p className="card-date">
                    <Moment format="YYYY/MM/DD">{cardSingle.time}</Moment>
                  </p>
                </span>
              </div>
              <form className="comment-form" action="submit">
                <input placeholder="Add a comment..." type="text" />
                <input type="submit" value="Post" />
              </form>
            </span>
          </div>
        )}
        {!this.props.posts && <div>LOADING....</div>}
      </div>
    );
  }
}
