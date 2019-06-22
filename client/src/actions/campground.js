import axios from 'axios';
import { GET_CAMPGROUNDS, CAMPGROUND_ERROR } from './types';

// Get campgrounds
export const getCampgrounds = () => async dispatch => {
  try {
    const res = await axios.get('/api/campgrounds');
    dispatch({
      type: GET_CAMPGROUNDS,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: CAMPGROUND_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
