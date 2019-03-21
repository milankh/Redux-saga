export const FETCH_POST = "FETCH_POST";
export const FETCH_POST_SUCCESS = "FETCH_POST_SUCCESS";
export const FETCH_POST_FAILURE = "FETCH_POST_FAILURE";

export const ADD_POST = "ADD_POST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const COMPLETE_POST = "COMPLETE_POST";
export const COMPLETE_POST_SUCCESS = "COMPLETE_POST_SUCCESS";
export const COMPLETE_POST_FAILURE = "COMPLETE_POST_FAILURE";

export const fetchPost = () => {
  console.log("fetch post action called");
  return {
    type: FETCH_POST
  };
};

export const fetchPostSuccess = data => {
  console.log("fetch post success action called");
  return {
    type: FETCH_POST_SUCCESS,
    payload: data
  };
};

export const fetchPostFailure = data => {
  console.log("fetch post failure action called");

  return {
    type: FETCH_POST_SUCCESS,
    payload: data
  };
};

export const addPost = post => {
  console.log("add post action called");
  return {
    type: ADD_POST,
    payload: post
  };
};

export const addPostSuccess = post => {
  console.log("add post success called");
  return {
    type: ADD_POST_SUCCESS,
    payload: post
  };
};
export const addPostFailure = error => {
  console.log("add post failure called" + error);
  return {
    type: ADD_POST_FAILURE,
    payload: error
  };
};

export const completePost = id => {
  console.log("complete post action called");
  return {
    type: COMPLETE_POST,
    payload: id
  };
};

export const completePostSuccess = id => {
  console.log("complete post success action called" + id);
  return {
    type: COMPLETE_POST_SUCCESS,
    payload: id
  };
};

export const completePostFailure = id => {
  console.log("complete post failure action called");
  return {
    type: COMPLETE_POST_FAILURE,
    payload: id
  };
};
