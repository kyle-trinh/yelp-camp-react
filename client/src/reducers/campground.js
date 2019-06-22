import { GET_CAMPGROUNDS, CAMPGROUND_ERROR } from '../actions/types';

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
    case CAMPGROUND_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
