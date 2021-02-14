import React, { Component } from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
import SearchField from "react-search-field";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import "./App.css";
let new_comment_text = "";
class App extends Component {
  state = {
    comments: [],
  };
  // new_comment_text=""
  componentDidMount() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch("http://localhost:3001/api/comments", {
      method: "GET",
      headers: myHeaders,
    }).then((data) =>
      data.json().then((data) => {
        this.setState({ ...this.state, comments: data });
      })
    );
  }
  deleteComment(id) {
    fetch("http://localhost:3001/api/comments/" + id, {
      method: "DELETE",
    }).then(() => this.componentDidMount());
  }
  handleOnChange = (e) => {
    new_comment_text = e.target.value;
  };
  handleOnSubmit(e) {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({ text: String(new_comment_text) });
    fetch("http://localhost:3001/api/comments/", {
      method: "POST",
      body: raw,
      headers: myHeaders,
    }).then(() => alert("Success : Added new Comment"));
  }
  render() {
    return (
      <div className="App">
        {/* <button onClick={this.resetCommentFeed}>Reset comment feed</button> */}
        <h1 className="center">Comment Feed</h1>
        <div className="row">
          <a
            className="waves-effect waves-light btn col s2"
            style={{marginLeft:"2%", marginRight:"2%"}}
            onClick={this.resetCommentFeed}
          >
            Reset comment feed
          </a>
          <div className="New-comment-container col s7">
            <form className="white">
              <h5 className="dark-grey text-darken-3">Add new comment</h5>
              <div className="input-field">
                <input
                  type="text"
                  id="title"
                  onChange={this.handleOnChange}
                ></input>
                <label htmlFor="title">Comment text....</label>
              </div>
              <div className="input-field">
                <button
                  className="btn z-depth-0 pink darken-1"
                  onClick={this.handleOnSubmit}
                >
                  Create
                </button>
              </div>
            </form>
          </div>
          <Autocomplete
            id="combo-box-demo"
            options={this.state.comments}
            getOptionLabel={(option) => option.text}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Comments"
                variant="outlined"
              />
            )}
            className="col s3"
          />
        </div>
        <div className="comments-container center">
          {this.state.comments &&
            this.state.comments.map((comment) => (
              <div className="row" style={{marginLeft:"35%"}}>
                <div className="col s6 ">
                  <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                      <span className="card-title">
                        {"Comment " + comment.id}
                      </span>
                      <p>{comment.text}</p>
                    </div>
                    <div className="card-action">
                      <a
                        className="waves-effect waves-light btn"
                        onClick={() => this.deleteComment(comment.id)}
                      >
                        Delete This Comment
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }

  private resetCommentFeed = () => {
    fetch("/api/reset-comments", {
      method: "post",
    });
  };
}

export default App;
