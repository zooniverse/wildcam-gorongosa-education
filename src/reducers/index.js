import { combineReducers } from 'redux';

import * as teacher from './teacher';
import * as student from './student';
import * as login from './login';
import * as users from './users';
import * as map from './map';
import * as assignment from './assignment';

const reducers = Object.assign({}, teacher, student, login, users, map, assignment);
export default combineReducers(reducers);
