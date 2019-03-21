import { COMPLETE_JOB, ADD_JOB } from "./actions";

const initialState = {
  posts: []
};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case COMPLETE_JOB:
      break;
    case ADD_JOB:
      break;
    default:
      return state;
  }
}
