import {
  GET_CAMPGROUNDS,
  GET_CAMPGROUND,
  CAMPGROUND_ERROR,
  CREATE_CAMPGROUND
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
  }
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

    default:
      return state;
  }
}
