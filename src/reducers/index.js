import { combineReducers } from 'redux';

import * as classrooms from './classrooms';
import * as login from './login';
import * as users from './users';

const reducers = Object.assign({}, classrooms, login, users);
export default combineReducers(reducers);
