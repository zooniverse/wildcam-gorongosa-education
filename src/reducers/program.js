import * as types from '../constants/actionTypes';

const initialState = {
  program: {
    loading: false,
    data: {},
    error: false
  }
};

export function program(state = initialState, action) {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case types.REQUEST_PROGRAM:
      return { ...state,
        program: {
          loading: true,
          data: {},
          error: false
        }
      }
    case types.RECEIVE_PROGRAM:
      return { ...state,
        program: {
          loading: false,
          data: action.data,
          error: action.error
        }
      };
    case types.RECEIVE_PROGRAM_ERROR:
      return { ...state,
        classrooms: {
          loading: false,
          data: action.data,
          error: action.error,
        }
      }
    default:
      return state;
  }
}
