import {
  GET_CAMPGROUNDS,
  CAMPGROUND_ERROR,
  GET_CAMPGROUND,
  REMOVE_COMMENT
} from '../actions/types';

const initialState = {
  campgrounds: [],
  campground: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_CAMPGROUNDS:
      return {
        ...state,
        campgrounds: payload,
        loading: false
      };
    case GET_CAMPGROUND:
      return {
        ...state,
        campground: payload,
        loading: false
      };
    case CAMPGROUND_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        campground: {
          ...state.campground,
          comments: state.campground.comments.filter(
            comment => comment._id !== payload
          )
        }
      };
    default:
      return state;
  }
}
