import * as types from '../constants/actionTypes';

const initialState = { loading: false, data: [], error: false, members: [], uniqueMemberLogins: [] };


export function classrooms(state = initialState, action) {
  switch (action.type) {
    case types.JOIN_CLASSROOM:
      return Object.assign({}, state, {
        loading: true,
      });
    case types.JOIN_CLASSROOM_SUCCESS:
      return Object.assign({}, state, {
        data: state.data.concat(action.data),
        loading: false,
        error: false,
        members: state.members.concat(action.members),
      });
    case types.REQUEST_CLASSROOMS:
      return Object.assign({}, state, {
        loading: true,
      });
    case types.REQUEST_STUDENT_CLASSROOMS:
      return Object.assign({}, state, {
        loading: true,
      });
    case types.RECEIVE_CLASSROOMS:
      let uniqueMemberLogins = [];
      action.members.map((item) => {
        if (uniqueMemberLogins.indexOf(item.attributes.zooniverse_login) < 0) {
          uniqueMemberLogins.push(item.attributes.zooniverse_login);
        }
      });
      return Object.assign({}, state, {
        loading: false,
        data: action.data || [],
        error: action.error,
        members: action.members || [],
        uniqueMemberLogins: uniqueMemberLogins || [],
      });
    case types.RECEIVE_STUDENT_CLASSROOMS:
      return Object.assign({}, state, {
        loading: false,
        data: action.data || [],
        error: action.error,
        members: action.members || [],
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
