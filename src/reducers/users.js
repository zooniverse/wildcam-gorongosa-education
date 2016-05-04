import * as types from '../constants/actionTypes';

const initialState = {
  data: {
    attributes: {
      metadata: {}
    }
  },
  loading: false };

export function users(state = initialState, action) {
  switch (action.type) {
    case types.REQUEST_USER:
      return { ...state,
        loading: true,
      }
      case types.RECEIVE_USER:
      return { ...state,
        data: action.data,
        loading: false,
      }
    case types.UPSERT_TEACHER_METADATA:
      return { ...state,
        data: action.data,
        loading: true,
      }
    case types.UPSERT_TEACHER_METADATA_SUCCESS:
      return { ...state,
        data: action.data,
        loading: false,
      }
    default:
      return state;
  }
}
