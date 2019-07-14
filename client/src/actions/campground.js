import {
  GET_CAMPGROUND,
  GET_CAMPGROUNDS,
  CAMPGROUND_ERROR,
  CREATE_CAMPGROUND,
  CLEAR_CAMPGROUND,
  UPDATE_LIKES,
  UPDATE_CAMPGROUND,
  DELETE_CAMPGROUND,
  ADD_COMMENT,
  REMOVE_COMMENT
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
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
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
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CAMPGROUND_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const updateCampground = (id, formData) => async dispatch => {
  const { title, description, coverImage, image } = formData;
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify({ title, description, coverImage, image });

    const res = await axios.put(`/api/campgrounds/${id}`, body, config);

    dispatch({
      type: UPDATE_CAMPGROUND,
      payload: res.data
    });

    dispatch(setAlert('Campground Updated', 'success'));

    setTimeout(() => history.push(`/campground/${id}`), 3000);
  } catch (err) {
    console.log(err);
  }
};

export const deleteCampground = id => async dispatch => {
  try {
    await axios.delete(`/api/campgrounds/${id}`);

    dispatch({
      type: DELETE_CAMPGROUND,
      payload: id
    });

    dispatch(setAlert('Campground Deleted', 'success'));
    history.push('/');
  } catch (err) {
    console.log(err);
  }
};

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
    console.log(err);
  }
};

export const deleteComment = (campgroundId, commentId) => async dispatch => {
  try {
    await axios.delete(`/api/campgrounds/comment/${campgroundId}/${commentId}`);
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    });
    dispatch(setAlert('Comment removed', 'success'));
  } catch (err) {
    console.log(err);
  }
};

export const clearCampground = () => dispatch => {
  dispatch({
    type: CLEAR_CAMPGROUND
  });
};
