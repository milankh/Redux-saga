import React from "react";
import "../../App.css";
import { connect } from "react-redux";
import { fetchAllPosts } from "../../helper/apiHelper";
import {
  fetchPost,
  fetchPostSuccess,
  fetchPostFailure,
  addPost,
  addPostFailure,
  addPostSuccess,
  completePost,
  completePostFailure,
  completePostSuccess
} from "./actions";
import { timeout } from "q";

class Posts extends React.Component {
  //used to generate fake ids for each posts added
  // since no server/api is there to generate IDs for us
  //not necessary otherwise
  idGenerator = 999;

  constructor(props) {
    super(props);
    this.state = {
      inputField: ""
    };
  }

  handleInputOnChange = e => {
    this.setState({
      inputField: e.target.value
    });
  };

  handleOnSubmit = e => {
    this.idGenerator++;
    e.preventDefault();
    let post = {
      title: this.state.inputField,
      completed: false,
      userId: 2,
      id: this.idGenerator
    };
    this.props.addPost(post);
    setTimeout(() => {
      //some random condition for demo
      if (2 === 4 - 2) this.props.addPostSuccess(post);
      else {
        this.props.addPostFailure("failed to add the post you entered");
      }
    }, 2000);
  };

  componentDidMount() {
    //this method is not the good approach to carry out async operations in Redux (But this is the basic concept)

    //first call fetchPostaction before fetching posts mannually
    this.props.fetchPost();

    //yeha just some api call jasto feel garauna ko lagi 2 second ko timeout haleko
    setTimeout(() => {
      //fetch the posts
      fetchAllPosts()
        .then(value => {
          let jsonResponse = JSON.parse(value);
          //call fetchPostSuccess if fetching successfull
          this.props.fetchPostSuccess(jsonResponse);
        })
        .catch(e => {
          //call fetchPostFailure if fetching fails
          this.props.fetchPostFailure("Fetching data failed due to some issue");
        });
    }, 2000);
  }

  makeComplete(id) {
    this.props.completePost(id);
    setTimeout(() => {
      if (4 - 2 === 2) this.props.completePostSuccess(id);
      else {
        this.props.completePostFailure(id);
      }
    }, 2000);
  }

  getPostList() {
    if (this.props.posts.loading) {
      return <div>loading</div>;
    } else {
      return (
        <ol>
          {this.props.posts.posts.map(post => (
            <li
              key={post.id}
              style={{ backgroundColor: "lightgray", color: "green" }}
            >
              <div>{post.title}</div>
              <div>
                {post.completed === null ? (
                  <div>changing</div>
                ) : post.completed ? (
                  <div className="done">Done</div>
                ) : (
                  <div
                    className="not-done"
                    onClick={() => this.makeComplete(post.id)}
                  >
                    Not Done
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      );
    }
  }

  getButton() {
    if (this.props.posts.adding) {
      return <div>Adding .. .. .. ..</div>;
    } else {
      return (
        <button type="submit" value="submit" className="add">
          Submit
        </button>
      );
    }
  }

  render() {
    return (
      <div className="posts-div">
        <h3>Create your own post</h3>
        <form action="POST" onSubmit={this.handleOnSubmit}>
          <label htmlFor="postTitle">Post Title:</label>
          <input
            onChange={this.handleInputOnChange}
            type="text"
            name="postTitle"
            value={this.state.inputField}
          />
          {this.getButton()}
        </form>
        <h3>Recent Posts</h3>
        {this.getPostList()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.postReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPost: () => dispatch(fetchPost()),
    fetchPostSuccess: data => dispatch(fetchPostSuccess(data)),
    fetchPostFailure: data => dispatch(fetchPostFailure(data)),

    addPost: post => dispatch(addPost(post)),
    addPostFailure: error => dispatch(addPostFailure(error)),
    addPostSuccess: post => dispatch(addPostSuccess(post)),

    completePost: id => dispatch(completePost(id)),
    completePostSuccess: id => dispatch(completePostSuccess(id)),
    completePostFailure: id => dispatch(completePostFailure(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
