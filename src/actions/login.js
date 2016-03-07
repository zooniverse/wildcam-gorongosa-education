import * as types from '../constants/actionTypes';

// Action creators

export function setLoginUser(user) {
  return dispatch => {
    dispatch({
      type: types.SET_LOGIN_USER,
      user
    });
  };
}
