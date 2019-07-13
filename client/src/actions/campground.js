import {
  GET_CAMPGROUND,
  GET_CAMPGROUNDS,
  CAMPGROUND_ERROR,
  CREATE_CAMPGROUND,
  CLEAR_CAMPGROUND,
  UPDATE_LIKES
} from './types';
import axios from 'axios';
import history from '../history';
import { setAlert } from './alert';

export const getCampgrounds = () => async dispatch => {
  try {
    const res = await axios.get('/api/campgrounds');

    dispatch({
      type: GET_CAMPGROUNDS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CAMPGROUND_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getCampground = id => async dispatch => {
  try {
    const res = await axios.get(`/api/campgrounds/${id}`);
    dispatch({
      type: GET_CAMPGROUND,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    // dispatch({
    //   type: CAMPGROUND_ERROR,
    //   payload: { msg: err.response.statusText, status: err.response.status }
    // });
  }
};

export const createCampground = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/campgrounds', formData, config);
    dispatch({
      type: CREATE_CAMPGROUND,
      payload: res.data
    });

    dispatch(setAlert('Campground Created', 'success'));

    setTimeout(() => history.push('/'), 3000);
  } catch (err) {
    dispatch({
      type: CAMPGROUND_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const addLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/campgrounds/like/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: res.data
    });

    console.log(res);
  } catch (err) {
    dispatch({
      type: CAMPGROUND_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const removeLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/campgrounds/unlike/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: CAMPGROUND_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const clearCampground = () => dispatch => {
  dispatch({
    type: CLEAR_CAMPGROUND
  });
};
