import {
  GET_CAMPGROUND,
  GET_CAMPGROUNDS,
  CAMPGROUND_ERROR,
  CREATE_CAMPGROUND
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
