import React, { Component } from "react";
import "./singlecard.css";
import Moment from "react-moment";
import { history } from "../../App";
import Modal from "react-responsive-modal";
import Axios from "axios";
import { FacebookShareButton } from "react-share";

export default class Singlecard extends Component {
  state = {
    comment: "",
    isOpen: false,
    ishidden: "hidden",
    delete: "",
    report: "",
    open: "",
    heartclass: "far fa-heart"
  };

  toggleLike = e => {
    e.preventDefault();
    if (this.state.heartclass === "fas fa-heart") {
      this.setState({ heartclass: "far fa-heart" });
    } else if (this.state.heartclass === "far fa-heart") {
      this.setState({ heartclass: "fas fa-heart" });
    }
  };

  onSureDelete = e => {
    const id = history.location.pathname.replace(
      history.location.pathname[0],
      ""
    );
    Axios.delete(`http://localhost:3001/posts/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.token
      }
    });
    console.log({ deletedID: id });
    history.push("/");
    this.setState({ delete: false });
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  onDeleteclick = e => {
    e.preventDefault();
    this.setState({ delete: true, ishidden: "hidden", isOpen: false });
    this.onOpenModal();
  };

  onChangeMind = e => {
    e.preventDefault();
    this.setState({ delete: false });
    this.onCloseModal();
  };

  openMenu = () => {
    if (this.state.isOpen === false) {
      this.setState({ ishidden: "visible", isOpen: true });
    }
    if (this.state.isOpen === true) {
      this.setState({ ishidden: "hidden", isOpen: false });
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.postComment(
      this.state,
      history.location.pathname.replace(history.location.pathname[0], "")
    );
    this.setState({ comment: "" });
    history.push(
      `/${history.location.pathname.replace(history.location.pathname[0], "")}`
    );
  };

  render() {
    const { location } = history;
    const { posts } = this.props;
    if (posts.length > 1) {
      var cardSingle = posts.find(
        card => card._id === location.pathname.replace(location.pathname[0], "")
      );
      // console.log(cardSingle);
    }
    const { open } = this.state;
    return (
      <div className="single-container">
        {cardSingle && (
          <div className="single-wrapper">
            <span
              className="body"
              style={{ backgroundImage: `url(${cardSingle.img})` }}
            ></span>
            <span className="footer">
              <span className="header">
                <div className="header-sub">
                  <i id="round-icon" className="fas fa-user-circle icons"></i>
                  <p>{this.props.data}</p>
                  <p onClick={this.openMenu} className="hidden-menu-trigger">
                    ...
                  </p>
                </div>
                <div className="header-sub-body">
                  {" "}
                  <span className="h3">{`"${cardSingle.content}"`}</span>
                  {"  "}
                </div>
                <span
                  className="hidden-menu"
                  style={{ visibility: this.state.ishidden }}
                >
                  {this.props.user._id === cardSingle.owner && (
                    <li
                      value="delete"
                      name="delete"
                      onClick={this.onDeleteclick}
                    >
                      Delete
                    </li>
                  )}

                  <li name="report" value="report">
                    Report
                  </li>
                </span>
              </span>
              <section className="scroll-wrapper">
                <div className="comment-wrapper scrollable">
                  <span className="p"></span>
                  {cardSingle.comments.map((comment, index) => (
                    <span className="comment-card" key={comment._id}>
                      <i
                        id="round-icon"
                        className="fas fa-user-circle icons"
                        style={{ maxHeight: "15px" }}
                      ></i>
                      <span className="p">
                        <span className="h3">{this.props.data}</span>{" "}
                        {comment.content}
                      </span>
                    </span>
                  ))}
                </div>
              </section>
              <div className="form">
                <span className="card-icons">
                  <i
                    onClick={this.toggleLike}
                    className={this.state.heartclass}
                  ></i>
                  <i
                    className="far fa-comment"
                    onClick={() => {
                      this.myInp.focus();
                    }}
                  ></i>
                  {/* TODO*change this before going live */}
                  <FacebookShareButton
                    url={`http://www.google.com${history.location.pathname}`}
                  >
                    <i className="fab fa-telegram-plane"></i>
                  </FacebookShareButton>
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
                  ref={ip => (this.myInp = ip)}
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

        {this.state.delete && (
          <div>
            <Modal open={open} onClose={this.onCloseModal}>
              <div className="modal-btn" style={{ padding: "3.2rem" }}>
                <p>are you sure you would like to delete this post?</p>
                <button
                  onClick={this.onSureDelete}
                  className="yes-btn"
                  type="submit"
                >
                  Yes
                </button>
                <button onClick={this.onChangeMind} type="submit">
                  No
                </button>
              </div>
            </Modal>
          </div>
        )}
      </div>
    );
  }
}
