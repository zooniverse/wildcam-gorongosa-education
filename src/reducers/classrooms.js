import * as types from '../constants/actionTypes';

const initialState = { loading: false, data: [], error: false, members: [], uniqueMembers: [] };


export function classrooms(state = initialState, action) {
  switch (action.type) {
    case types.REQUEST_CLASSROOMS:
      return Object.assign({}, state, {
        loading: true,
      });
    case types.RECEIVE_CLASSROOMS:
      let uniqueMembers = [];
      action.members.map((item) => {
        if (uniqueMembers.indexOf(item.attributes.zooniverse_login) < 0) {
          uniqueMembers.push(item.attributes.zooniverse_login);
        }
      });
      return Object.assign({}, state, {
        loading: false,
        data: action.data || [],
        error: action.error,
        members: action.members || [],
        uniqueMembers: uniqueMembers || [],
      });
    case types.CREATE_CLASSROOM_SUCCESS:
      const newlist = state.data.concat(action.data)
      return Object.assign({}, state, {
        loading: false,
        data: newlist,
        error: false,
        members: action.members || [],
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
