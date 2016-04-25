import * as types from '../constants/actionTypes';

const initialState = {
  classrooms: {
    loading: false,
    data: [],
    error: false,
    members: [],
    uniqueMembers: [],
  }
};

export function teacher(state = initialState, action) {
  switch (action.type) {
    case types.REQUEST_CLASSROOMS:
      return Object.assign({}, state, {
        classrooms: {
          loading: true,
          data: [],
          error: false,
          members: [],
          uniqueMembers: [],
        }
      });
    case types.RECEIVE_CLASSROOMS:
      let uniqueMembers = [];
      action.members && action.members.map((item) => {
        if (uniqueMembers.indexOf(item.attributes.zooniverse_login) < 0) {
          uniqueMembers.push(item.attributes.zooniverse_login);
        }
      });
      return Object.assign({}, state, {
        classrooms: {
          loading: false,
          data: action.data || [],
          error: action.error,
          members: action.members || [],
          uniqueMembers: uniqueMembers || [],
        }
      });
    case types.CREATE_CLASSROOM:
      return Object.assign({}, state, {
        classrooms: {
          loading: true,
          data: state.classrooms.data,
          error: state.classrooms.error,
          members: state.classrooms.members,
          uniqueMembers: state.classrooms.uniqueMembers,
        }
      });
    case types.CREATE_CLASSROOM_SUCCESS:
      const newlist = state.classrooms.data.concat(action.data);
      return Object.assign({}, state, {
        classrooms: {
          loading: false,
          data: newlist,
          error: false,
          members: action.members || [],
          uniqueMembers: state.classrooms.uniqueMembers,
        }
      });
    case types.CREATE_CLASSROOM_ERROR:
      return Object.assign({}, state, {
        classrooms: {
          loading: false,
          data: action.data,
          error: action.error || false,
          members: state.classrooms.members,
          uniqueMembers: state.classrooms.uniqueMembers,
        }
      });

    case types.CLASSROOM_DELETE:
      let newState = Object.assign({}, state);
      const classroomsWithoutDeleted = state.classrooms.data.filter(classroom => classroom.id !== action.classroomId);
      newState.classrooms.data = classroomsWithoutDeleted;
      return newState;

    default:
      return state;
  }
}
