import * as types from '../constants/actionTypes';

const initialState = {
  assignments: {
    loading: false,
    data: [],
    error: false,
  }
};

export function assignment(state = initialState, action) {
  switch (action.type) {
    case types.CREATE_ASSIGNMENT:
      return { ...state,
        assignments: {
          data: state.assignments,
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
      console.log('-'.repeat(40), '\nREQUEST_ASSIGNMENTS\n');
      return { ...state,
        assignments: {
          data: [],
          error: false,
          loading: true,
        }
      };
    case types.RECEIVE_ASSIGNMENTS:
      console.log('-'.repeat(40), '\nRECEIVE_ASSIGNMENTS\n');
      return { ...state,
        assignments: {
          data: action.data,
          error: false,
          loading: false,
        }
      };
    case types.RECEIVE_ASSIGNMENTS_ERROR:
      console.log('-'.repeat(40), '\nRECEIVE_ASSIGNMENTS_ERROR\n');
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
