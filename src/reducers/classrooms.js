import * as types from '../constants/actionTypes';

const intialState = { loading: false, data: [], error: false };


export function classrooms(state = intialState, action) {
  switch (action.type) {
    case types.JOIN_CLASSROOM:
      return Object.assign({}, state, {
        loading: false,
        data: action.data,
        error: action.error,
      });
    case types.REQUEST_CLASSROOMS:
      return Object.assign({}, state, {
        loading: true,
      });
    case types.RECEIVE_CLASSROOMS:
      return Object.assign({}, state, {
        loading: false,
        data: action.data,
        error: action.error,
      });
      case types.CREATE_CLASSROOM:
      return Object.assign({}, state, {
        loading: true
      });
    case types.CREATE_CLASSROOM_SUCCESS:
      const newlist = state.data.concat(action.data)
      return Object.assign({}, state, {
        loading: false,
        data: newlist,
        error: false,
      });
    case types.CREATE_CLASSROOM_ERROR:
      return Object.assign({}, state, {
        loading: false,
        data: action.data,
        error: action.error || false,
      });
    default:
      return state;
  }
}
