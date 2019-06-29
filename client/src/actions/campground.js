import axios from 'axios';
import {
  GET_CAMPGROUNDS,
  CAMPGROUND_ERROR,
  CREATE_CAMPGROUND,
  GET_CAMPGROUND,
  REMOVE_COMMENT,
  ADD_COMMENT,
  UPDATE_LIKES,
  DELETE_CAMPGROUND
} from './types';
import { setAlert } from './alert';
import history from '../history';

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

// Create campground
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
    setTimeout(() => history.push('/'), 3000);
    dispatch(setAlert('Campground Created', 'success'));
  } catch (err) {
    dispatch({
      type: CAMPGROUND_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get Campground
export const getCampground = id => async dispatch => {
  try {
    const res = await axios.get(`/api/campgrounds/${id}`);
    dispatch({
      type: GET_CAMPGROUND,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CAMPGROUND_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete campground
export const deleteCampground = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/campgrounds/${id}`);
    dispatch({
      type: DELETE_CAMPGROUND,
      payload: id
    });
    dispatch(setAlert('Campground removed', 'success'));
    history.push('/');
  } catch (err) {
    dispatch({
      type: CAMPGROUND_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete comment
export const deleteComment = (campgroundId, commentId) => async dispatch => {
  try {
    await axios.delete(`/api/campgrounds/comment/${campgroundId}/${commentId}`);
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    });

    dispatch(setAlert('Comment removed', 'success'));
  } catch (err) {
    dispatch({
      type: CAMPGROUND_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add comment
export const addComment = (campgroundId, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(
      `/api/campgrounds/comment/${campgroundId}`,
      formData,
      config
    );
    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });
    dispatch(setAlert('Comment added', 'success'));
  } catch (err) {
    dispatch({
      type: CAMPGROUND_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add like
export const addLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/campgrounds/like/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
    console.log({ id, likes: res.data });
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
    console.log({ id, likes: res.data });
  } catch (err) {
    dispatch({
      type: CAMPGROUND_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
