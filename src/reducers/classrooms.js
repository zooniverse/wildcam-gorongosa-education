import * as types from '../constants/actionTypes';


export function selectedClassroom(state = {}, action) {
  switch (types) {
    case types.SELECT_CLASSROOM:
      return Object.assign({}, state);
    default:
      return state;
  }
}

export function allClassrooms(state = { isFetching: false, classrooms: [], error: false }, action) {
  switch (action.type) {
    case types.REQUEST_CLASSROOMS:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case types.RECEIVE_CLASSROOMS:
      return Object.assign({}, state, {
        isFetching: false,
        classrooms: action.classrooms,
        error: action.error,
      });
    default:
      return state;
  }
}
