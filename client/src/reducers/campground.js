import {
  GET_CAMPGROUNDS,
  GET_CAMPGROUND,
  CAMPGROUND_ERROR,
  CLEAR_CAMPGROUND,
  UPDATE_LIKES,
  UPDATE_CAMPGROUND,
  ADD_COMMENT,
  REMOVE_COMMENT
} from '../actions/types';

const initialState = {
  campgrounds: {
    campgrounds: [],
    loading: true,
    error: {}
  },
  campground: {
    campground: null,
    loading: true,
    error: {}
  },
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CAMPGROUNDS:
      return {
        ...state,
        campgrounds: {
          ...state.campgrounds,
          campgrounds: payload,
          loading: false
        }
      };
    case GET_CAMPGROUND:
    case UPDATE_CAMPGROUND:
      return {
        ...state,
        campground: {
          ...state.campground,
          campground: payload,
          loading: false
        }
      };

    case CLEAR_CAMPGROUND:
      return {
        ...state,
        campground: {
          ...state.campground,
          campground: null,
          loading: true
        }
      };
    case UPDATE_LIKES:
      return {
        ...state,
        campground: {
          ...state.campground,
          campground: {
            ...state.campground.campground,
            likes: payload
          },
          loading: false
        },
        loading: false
      };
    case ADD_COMMENT:
      return {
        ...state,
        campground: {
          ...state.campground,
          campground: {
            ...state.campground.campground,
            comments: payload
          },
          loading: false
        }
      };
    case CAMPGROUND_ERROR:
      return {
        ...state,
        error: payload
      };
    default:
      return state;
  }
}
