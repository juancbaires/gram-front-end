import React, { Component } from "react";
import { Link } from "react-router-dom";
import Modal from "react-responsive-modal";
import "./profile.css";
import { history } from "../../App";
import axios from "axios";

export default class profile extends Component {
  state = {
    usersPost: "",
    open: false,
    image: "",
    content: "No file selected..."
  };

  handleUploadSubmit = e => {
    e.preventDefault();
    // console.log(image, content);
    const data = new FormData();
    data.set("content", this.state.content);
    data.append("image", this.state.image);
    console.log(data);
    axios({
      method: "post",
      url: "http://localhost:3001/posts/new-post",
      data,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.token
      }
    })
      .then(function(response) {
        //handle success
        this.props.getposts();
        history.push("/");
        // console.log(response);
      })
      .catch(function(error) {
        //handle error
        console.log(error);
      });
  };

  onFileChange = e => {
    console.log(e.target.files["0"]);
    this.setState({
      image: e.target.files["0"]
    });
  };

  onContentChange = e => {
    this.setState({ content: e.target.value });
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };
  render() {
    if (this.props.posts.length) {
      var { posts } = this.props;
      var items = posts.filter(post => post.owner === this.props.user._id);
    }
    const { open } = this.state;
    return (
      <>
        <div className="cards-container">
          {this.props.posts && (
            <>
              <ul className="gallery">
                <div onClick={this.onOpenModal}>
                  <li className="gallery-item">
                    <div className="upload-image-tile"></div>
                    <span className="not--hover">
                      <i className="fas fa-upload icons-hover"></i>
                      <i
                        style={{
                          fontFamily: "Roboto",
                          fontStyle: "normal",
                          fontWeight: "500"
                        }}
                      >
                        Upload an image
                      </i>
                    </span>
                  </li>
                </div>
                {items.map((item, index) => (
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
              <></>
            </>
          )}
          <div className="modal">
            <Modal open={open} onClose={this.onCloseModal}>
              {/* <h2>Upload an Image</h2> */}
              <form
                onSubmit={this.handleUploadSubmit}
                className="upload-form"
                action="submit"
                encType="multipart/form-data"
              >
                <textarea
                  onChange={this.onContentChange}
                  className="text-area-modal"
                  name="content"
                  id=""
                  cols="30"
                  rows="10"
                  placeholder="Add post content here..."
                ></textarea>
                <div className="modal-footer">
                  <label htmlFor="file-upload" className="custom-file-upload">
                    Choose Image
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    name="file"
                    onChange={this.onFileChange}
                  />
                  <span trunc="true" className="file-status">
                    {/* {this.state.image.name} */}
                  </span>
                  <button type="submit">submit</button>
                </div>
              </form>
            </Modal>
          </div>
          <>{!this.props.posts && <h1>Loading</h1>}</>
        </div>
      </>
    );
  }
}
