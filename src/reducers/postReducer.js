import {
  FETCH_POST,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAILURE,
  ADD_POST,
  ADD_POST_FAILURE,
  ADD_POST_SUCCESS,
  COMPLETE_POST,
  COMPLETE_POST_FAILURE,
  COMPLETE_POST_SUCCESS
} from "../components/Post/actions";
const initialState = {
  posts: null,
  loading: true,
  adding: false
  //post format:
  //    post:{
  //        id:1,
  //        userId:2,
  //        title:"mfisofe",
  //        completed:false,
  //    }
};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_POST:
      return { ...state, loading: true };
    case FETCH_POST_SUCCESS:
      console.log(action);
      return { ...state, loading: false, posts: action.payload };
    case FETCH_POST_FAILURE:
      console.log(action);
      return { ...state, loading: false, posts: [] };

    case ADD_POST:
      console.log("adding post");
      return {
        ...state,
        adding: true
      };
    case ADD_POST_SUCCESS:
      console.log("adding post success ");
      let newPosts = [...state.posts, action.payload];
      return {
        ...state,
        adding: false,
        posts: newPosts
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        adding: false
      };

    case COMPLETE_POST:
      let np = state.posts;
      np.forEach(post => {
        if (post.id === action.payload) {
          post.completed = null;
        }
      });
      return { ...state, posts: np };

    case COMPLETE_POST_FAILURE:
      let tempP = state.posts;
      tempP.forEach(post => {
        if (post.id === action.payload) {
          post.completed = false;
        }
      });
      return { ...state, posts: tempP };

    case COMPLETE_POST_SUCCESS:
      let tempPost = state.posts;
      tempPost.forEach(post => {
        if (post.id === action.payload) {
          post.completed = true;
        }
      });
      return { ...state, posts: tempPost };
    default:
      return state;
  }
}
