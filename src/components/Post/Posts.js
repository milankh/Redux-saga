import React from "react";
import "../../App.css";
import { connect } from "react-redux";
import { fetchPost, addPost, completePost } from "./actions";

// this version uses redux saga for its async operations

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
    //here only addPost is called
    // other actions () success and failures) are handled by saga
    this.props.addPost(post);
  };

  componentDidMount() {
    //only fetch post is called
    // further actions are dispatched by saga

    this.props.fetchPost();
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
                    onClick={() => this.props.completePost(post.id)}
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
    addPost: post => dispatch(addPost(post)),
    completePost: id => dispatch(completePost(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
