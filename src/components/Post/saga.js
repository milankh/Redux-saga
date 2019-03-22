import { put, takeLatest, call } from "redux-saga/effects";

import {
  fetchPostFailure,
  fetchPostSuccess,
  FETCH_POST,
  completePostFailure,
  completePostSuccess,
  COMPLETE_POST,
  ADD_POST,
  addPostSuccess,
  addPostFailure
} from "./actions";

import { fetchAllPosts } from "../../helper/apiHelper";
import { Exception } from "handlebars";

function* fetchPost(action) {
  // comes here when FETCH_POST action is dispatched
  try {
    const p = yield call(fetchAllPosts);
    const posts = JSON.parse(p);

    yield put(fetchPostSuccess(posts));
  } catch (e) {
    yield put(fetchPostFailure("failed to fetch posts"));
  }
}

function* completePost(action) {
  // comes here when COMPLETE_POST action is dispatched
  try {
    //ALL API CALLS ARE DONE HERE
    //change this condition to throw error and call completionPostFailure
    if (4 - 2 !== 2) {
      console.log("throwing exception");
      throw Exception();
    }
    //IF THIS CODE RUNS, IT MEANS THAT API CALL HAS BEEN SUCCESSFULL
    //call success action
    yield put(completePostSuccess(action.payload));
  } catch (e) {
    console.log("failed for some reason ");
    //here call failure action
    yield put(completePostFailure("post completion failed"));
  }
}

function* addPost(action) {
  // comes here when ADD_POST action is dispatched
  try {
    //some random condition for demo
    if (2 !== 4 - 2) {
      throw Exception();
    }
    yield put(addPostSuccess(action.payload));
  } catch (e) {
    yield put(addPostFailure(action.payload));
  }
}

function* postSaga() {
  // here saga waits for FETCH_P0ST,COMPLETE_POST and ADD_POST and execures methods as below
  yield takeLatest(FETCH_POST, fetchPost);
  yield takeLatest(COMPLETE_POST, completePost);
  yield takeLatest(ADD_POST, addPost);
}

export default postSaga;
