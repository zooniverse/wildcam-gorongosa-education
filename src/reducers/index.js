import { combineReducers } from 'redux';

import * as teacher from './teacher';
import * as student from './student';
import * as login from './login';
import * as users from './users';
import * as mapexplorer from './mapexplorer';
import * as assignment from './assignment';
import * as program from './program';

const reducers = Object.assign({}, teacher, student, login, users, mapexplorer, assignment, program);
export default combineReducers(reducers);
