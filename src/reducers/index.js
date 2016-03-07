import { combineReducers } from 'redux';

import * as classrooms from './classrooms';
import * as login from './login';

const reducers = Object.assign({}, classrooms, login);
export default combineReducers(reducers);
