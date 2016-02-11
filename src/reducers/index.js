import { combineReducers } from 'redux';

import * as classrooms from './classrooms';


const reducers = Object.assign({}, classrooms);

export default combineReducers(reducers);
