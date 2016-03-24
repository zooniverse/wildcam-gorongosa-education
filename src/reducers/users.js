import * as types from '../constants/actionTypes';

const initialState = { data: {} };

export function users(state = initialState, action) {
  switch (action.type) {
    case types.REQUEST_USER:
      return Object.assign({}, state, {
        data: action.data,
      });
    case types.UPSERT_TEACHER_METADATA:
      return Object.assign({}, state, {
        data: action.data,
      });
    case types.UPSERT_TEACHER_METADATA_SUCCESS:
      //const newlist = state.data.concat(action.data)
      return Object.assign({}, state, {
        data: action.data,
      });
    default:
      return state;
  }
}
