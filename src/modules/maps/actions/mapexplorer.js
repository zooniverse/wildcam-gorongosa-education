import * as types from '../../../constants/actionTypes';
import config from '../../../constants/config';

//Action creators

export function addMapFilterValue(key, val) {
  return (dispatch) => {
    dispatch({
      type: 'ADD_MAP_FILTER_VALUE',
      key, val
    });
  };
}

export function removeMapFilterValue(key, val) {
  return (dispatch) => {
    dispatch({
      type: 'REMOVE_MAP_FILTER_VALUE',
      key, val
    });
  };
}

export function enableViewCameraMode(camera) {
  return (dispatch) => {
    dispatch({
      type: 'ENABLE_VIEW_CAMERA_MODE',
      camera
    });
  };
}

export function disableViewCameraMode() {
  return (dispatch) => {
    dispatch({
      type: 'DISABLE_VIEW_CAMERA_MODE'
    });
  };
}

export function enableSelectForAssignmentMode() {
  return (dispatch) => {
    dispatch({
      type: 'ENABLE_SELECT_FOR_ASSIGNMENT_MODE'
    });
  };
}

export function disableSelectForAssignmentMode() {
  return (dispatch) => {
    dispatch({
      type: 'DISABLE_SELECT_FOR_ASSIGNMENT_MODE'
    });
  };
}
