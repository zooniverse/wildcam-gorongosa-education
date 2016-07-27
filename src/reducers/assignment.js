import * as types from '../constants/actionTypes';

const initialState = {
  assignments: {
    loading: false,
    data: [],
    error: false,
  }
};

export function assignment(state = initialState, action) {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case types.CREATE_ASSIGNMENT:
      return { ...state,
        assignments: {
          data: state.assignments.data,
          error: false,
          loading: true,
        }
      };
    case types.CREATE_ASSIGNMENT_SUCCESS:
      const newlist = state.assignments.data.concat(action.data);
      return { ...state,
        assignments: {
          data: newlist,
          error: false,
          loading: false,
        }
      };
    case types.CREATE_ASSIGNMENT_ERROR:
      return { ...state,
        assignments: {
          data: [],
          error: action.error,
          loading: false,
        }
      };
    case types.REQUEST_ASSIGNMENTS:
      return { ...state,
        assignments: {
          data: [],
          error: false,
          loading: true,
        }
      };
    case types.RECEIVE_ASSIGNMENTS:
      return { ...state,
        assignments: {
          data: action.data,
          error: false,
          loading: false,
        }
      };
    case types.RECEIVE_ASSIGNMENTS_ERROR:
      return { ...state,
        assignments: {
          data: [],
          error: action.error,
          loading: false,
        }
      };
    case types.ASSIGNMENT_DELETE:
      return { ...state,
        assignments: {
          data: state.assignments.data,
          error: false,
          loading: true,
        }
      };
    case types.ASSIGNMENT_DELETE_SUCCESS:
      const assignmentsWithoutDeleted = state.assignments.data.filter(assignment => assignment.id !== action.assignmentId);
      newState.assignments.data = assignmentsWithoutDeleted;
      return { ...state,
        assignments: {
          data: newState.assignments.data,
          error: false,
          loading: false,
        }
      };
    case types.ASSIGNMENT_DELETE_ERROR:
      return { ...state,
        assignments: {
          data: [],
          error: action.error,
          loading: false,
        }
      };
    default:
      return state;
  }
}
