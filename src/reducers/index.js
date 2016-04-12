import { combineReducers } from 'redux';

import * as classrooms from './classrooms';
import * as student from './student';
import * as login from './login';
import * as users from './users';

const reducers = Object.assign({}, classrooms, student, login, users);
export default combineReducers(reducers);
