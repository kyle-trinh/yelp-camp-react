import {
  GET_CAMPGROUNDS,
  CAMPGROUND_ERROR,
  GET_CAMPGROUND,
  REMOVE_COMMENT,
  ADD_COMMENT,
  UPDATE_LIKES,
  DELETE_CAMPGROUND
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
    case DELETE_CAMPGROUND:
      return {
        ...state,
        campgrounds: state.campgrounds.filter(
          campground => campground._id !== payload
        ),
        loading: false
      };
    case CAMPGROUND_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case ADD_COMMENT:
      return {
        ...state,
        campground: {
          ...state.campground,
          comments: payload
        },
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
        },
        loading: false
      };
    case UPDATE_LIKES:
      return {
        ...state,
        campground: { ...state.campground, likes: payload.likes },

        loading: false
      };
    default:
      return state;
  }
}
