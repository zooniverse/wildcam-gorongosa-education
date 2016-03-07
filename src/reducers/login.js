import * as types from '../constants/actionTypes';

const initialState = { user: null };

export function login(state = initialState, action) {
  switch (action.type) {
    case types.SET_LOGIN_USER:
      return {
        user: action.user
      };
    default:
      return state;
  }
}
