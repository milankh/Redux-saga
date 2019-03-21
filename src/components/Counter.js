import React from "react";
import { connect } from "react-redux";
import "../App.css";

// Action creator that we use to mapDispatchToProps
const increment = {
  type: "INCREMENT"
};

const decrement = {
  type: "DECREMENT"
};

const reset = {
  type: "RESET"
};

class Counter extends React.Component {
  render() {
    return (
      <div className="counter-div">
        <h2>Counter</h2>
        <div>
          <button className="counter-button" onClick={this.props.decrement}>
            -
          </button>
          <span className="count-num">{this.props.count.count}</span>
          <button className="counter-button" onClick={this.props.increment}>
            +
          </button>
          <button
            className="counter-button"
            onClick={this.props.reset}
            style={{ fontSize: "1rem" }}
          >
            reset me
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    count: state.countReducer,
    name: state.name,
    age: state.age
  };
};

const mapDispatchToProps = dispatch => {
  return {
    increment: () => dispatch(increment),
    decrement: () => dispatch(decrement),
    reset: () => dispatch(reset)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);
