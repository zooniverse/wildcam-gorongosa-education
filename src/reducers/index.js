import { combineReducers } from 'redux';

import * as teacher from './teacher';
import * as student from './student';
import * as login from './login';
import * as users from './users';

const reducers = Object.assign({}, teacher, student, login, users);
export default combineReducers(reducers);
