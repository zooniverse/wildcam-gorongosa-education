import * as types from '../constants/actionTypes';

const initialState = {
  classrooms: {
    loading: false,
    data: [],
    error: false,
    members: []
    //uniqueMembers currently not required for student.classrooms
  }
};

export function student(state = initialState, action) {
  switch (action.type) {
    case types.JOIN_CLASSROOM:
      return { ...state,
        classrooms: {
          loading: true,
          data: state.classrooms.data,
          error: false,
          members: state.classrooms.members,
        }
      }
    case types.JOIN_CLASSROOM_SUCCESS:
      return { ...state,
        classrooms: {
          loading: false,
          data: state.classrooms.data.concat(action.data),
          error: false,
          members: state.classrooms.members.concat(action.members),
        }
      }
    case types.REQUEST_STUDENT_CLASSROOMS:
      return { ...state,
        classrooms: {
          loading: true,
          data: [],
          error: false,
          members: [],
        }
      }
    case types.RECEIVE_STUDENT_CLASSROOMS:
      return { ...state,
        classrooms: {
          loading: false,
          data: action.data || [],
          error: action.error,
          members: action.members || [],
        }
      }
    default:
      return state;
  }
}
