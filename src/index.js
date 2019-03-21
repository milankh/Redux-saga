import React from "react";
import "./index.css";
import Counter from "./components/Counter";
import { render } from "react-dom";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import countReducer from "./reducers/countReducer";
import postReducer from "./reducers/postReducer";
import Posts from "./components/Post/Posts";
import Thunk from "redux-thunk";

const store = createStore(combineReducers({ countReducer, postReducer }));

const App = () => (
  <Provider store={store}>
    <h1> Data is not in server / will be lost on reload</h1>
    <Counter />
    <Posts />
  </Provider>
);

render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
