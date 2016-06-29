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
          data: state.assignments,
          error: false,
          loading: true,
        }
      }
    case types.CREATE_CLASSROOM_SUCCESS:
      const newlist = state.assignments.data.concat(action.data);
      return { ...state,
        assignments: {
          data: newlist,
          error: false,
          loading: false,
        }
      }
    case types.CREATE_CLASSROOM_ERROR:
      return { ...state,
        assignments: {
          data: [],
          error: action.error,
          loading: false,
        }
      }
    default:
      return state;
  }
}
