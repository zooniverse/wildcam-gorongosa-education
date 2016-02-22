import * as types from '../constants/actionTypes';


const intialState = { isFetching: false, classrooms: [], error: false };

export function classrooms(state = intialState, action) {
  switch (action.type) {
    case types.REQUEST_CLASSROOMS:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case types.RECEIVE_CLASSROOMS:
      return Object.assign({}, state, {
        isFetching: false,
        classrooms: action.classrooms,
        error: action.error || false,
      });
    default:
      return state;
  }
}
