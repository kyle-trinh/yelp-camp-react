import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import campground from './campground';

export default combineReducers({ alert, auth, campground });
