import { combineReducers } from 'redux';
import alert from './alert';
import campground from './campground';

export default combineReducers({ alert, campground });
