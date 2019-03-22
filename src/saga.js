import { all, fork } from "redux-saga/effects";
import postSaga from "./components/Post/saga";

function* appSaga() {
  //this is the base file for all Redux saga files
  //in our case we dont need many sagas
  yield all([fork(postSaga)]);
}

export default appSaga;
