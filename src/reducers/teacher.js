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
  let newState = Object.assign({}, state);
  switch (action.type) {
    case types.EDIT_CLASSROOM:
      return { ...state,
        classrooms: {
          loading: true,
          data: state.classrooms.data,
          error: state.classrooms.error,
          members: state.classrooms.members,
          uniqueMembers: state.classrooms.uniqueMembers,
        }
      }
    case types.EDIT_CLASSROOM_SUCCESS:
      const newData = state.classrooms.data.map(classroom => {
        if (classroom.id === action.classroomId) {
          return Object.assign({}, classroom,
            { attributes: Object.assign({}, classroom.attributes, {}, action.fields) }
          );
        }
        return classroom;
      });

      return { ...state,
        classrooms: {
          loading: false,
          data: newData,
          error: false,
          members: state.classrooms.members || [],
          uniqueMembers: state.classrooms.uniqueMembers,
        }
      }
    case types.EDIT_CLASSROOM_ERROR:
      return { ...state,
        classrooms: {
          loading: false,
          data: action.data,
          error: action.error || false,
          members: state.classrooms.members,
          uniqueMembers: state.classrooms.uniqueMembers,
        }
      }
    case types.REQUEST_CLASSROOMS:
      return { ...state,
        classrooms: {
          loading: true,
          data: [],
          error: false,
          members: [],
          uniqueMembers: [],
        }
      }
    case types.RECEIVE_CLASSROOMS:
      let uniqueMembers = [];
      action.members && action.members.map(item => {
        if (uniqueMembers.indexOf(item.attributes.zooniverse_login) < 0) {
          uniqueMembers.push(item.attributes.zooniverse_login);
        }
      });
      return { ...state,
        classrooms: {
          loading: false,
          data: action.data || [],
          error: action.error,
          members: action.members || [],
          uniqueMembers: uniqueMembers || [],
        }
      }
    case types.CREATE_CLASSROOM:
      return { ...state,
        classrooms: {
          loading: true,
          data: state.classrooms.data,
          error: state.classrooms.error,
          members: state.classrooms.members,
          uniqueMembers: state.classrooms.uniqueMembers,
        }
      }
    case types.CREATE_CLASSROOM_SUCCESS:
      const newlist = state.classrooms.data.concat(action.data);
      return { ...state,
        classrooms: {
          loading: false,
          data: newlist,
          error: false,
          members: action.members || [],
          uniqueMembers: state.classrooms.uniqueMembers,
        }
      }
    case types.CREATE_CLASSROOM_ERROR:
      return { ...state,
        classrooms: {
          loading: false,
          data: action.data,
          error: action.error || false,
          members: state.classrooms.members,
          uniqueMembers: state.classrooms.uniqueMembers,
        }
      };
    case types.DELETE_STUDENT:
      const classroom = state.classrooms.data.find(classroom => classroom.id === action.classroomId);
      const students = classroom ? classroom.relationships.students.data : undefined;
      const studentsWithoutDeleted = students.filter(student => student.id !== action.studentId);
      newState.classrooms.data.map(classroom => {
        if (classroom.id === action.classroomId) {
          classroom.relationships.students.data = studentsWithoutDeleted
        }
      });
      return newState;
    case types.CLASSROOM_DELETE:
      return { ...state,
        classrooms: {
          loading: true,
          data: state.classrooms.data,
          error: state.classrooms.error,
          members: state.classrooms.members,
          uniqueMembers: state.classrooms.uniqueMembers,
        }
      }
    case types.CLASSROOM_DELETE_SUCCESS:

      const classroomsWithoutDeleted = state.classrooms.data.filter(classroom => classroom.id !== action.classroomId);
      newState.classrooms.data = classroomsWithoutDeleted;
      return { ...state,
        classrooms: {
          loading: false,
          data: newState.classrooms.data,
          error: false,
          members: newState.classrooms.members,
          uniqueMembers: newState.classrooms.uniqueMembers,
        }
      };
    case types.CLASSROOM_DELETE_ERROR:
      return { ...state,
        classrooms: {
          loading: false,
          data: action.data,
          error: action.error || false,
          members: state.classrooms.members,
          uniqueMembers: state.classrooms.uniqueMembers,
        }
      }
    default:
      return state;
  }
}
