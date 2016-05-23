import * as types from '../constants/actionTypes';
import Panoptes from 'panoptes-client';
import config from '../constants/config';

//Action creators

export function checkLoginUser() {  //First thing on app load - check if the user is logged in.
  return (dispatch) => {
    Panoptes.auth.checkCurrent()
      .then(user => {
        dispatch(setLoginUser(user));
      });
  }
}

export function setLoginUser(user) {
  return (dispatch) => {
    dispatch({
      type: types.SET_LOGIN_USER,
      user
    });
  };
}

export function loginToPanoptes() {  //Returns a login page URL for the user to navigate to.
  return (dispatch) => {
    return Panoptes.oauth.signIn(config.panoptesReturnUrl)
  }
}

export function logoutFromPanoptes() {
  return (dispatch) => {
    Panoptes.oauth.signOut()
      .then(user => {
        dispatch(setLoginUser(user));
      });
  }
}
