import { combineReducers } from 'redux';
import alert from './alert';
import campground from './campground';
import auth from './auth';

export default combineReducers({ alert, campground, auth });
