import React, { Component } from "react";
import "./singlecard.css";
import Moment from "react-moment";
export default class Singlecard extends Component {
  state = {
    comment: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.postComment(
      this.state,
      this.props.location.pathname.replace(this.props.location.pathname[0], "")
    );
    this.setState({ comment: "" });
    this.props.history.push(
      `/${this.props.location.pathname.replace(
        this.props.location.pathname[0],
        ""
      )}`
    );
  };

  render() {
    const { posts, location } = this.props;
    if (posts.length > 1) {
      var cardSingle = posts.find(
        card => card._id === location.pathname.replace(location.pathname[0], "")
      );
      //   console.log(cardSingle);
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
              <section className="scroll-wrapper">
                <div className="comment-wrapper scrollable">
                  {cardSingle.comments.map((comment, index) => (
                    <span className="comment-card" key={comment._id}>
                      <i
                        id="round-icon"
                        className="fas fa-user-circle icons"
                        style={{ maxHeight: "15px" }}
                      ></i>
                      <span className="p">
                        <span className="h3">{this.props.data}</span>{" "}
                        {`${comment.content}`}
                      </span>
                    </span>
                  ))}
                </div>
              </section>
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
              <form
                className="comment-form"
                action="submit"
                onSubmit={this.handleSubmit}
              >
                <input
                  onChange={this.handleChange}
                  name="comment"
                  placeholder="Add a comment..."
                  type="text"
                  value={this.state.comment}
                />
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
