import * as types from '../constants/actionTypes';
import Panoptes from 'panoptes-client';
import config from '../constants/config';

//Action creators

export function addMapSelector() {
  return (dispatch) => {
    dispatch({
      type: types.ADD_MAP_SELECTOR
    });
  };
}

export function removeMapSelector(selector) {
  return (dispatch) => {
    dispatch({
      type: types.REMOVE_MAP_SELECTOR,
      selector: selector
    });
  };
}

export function editMapSelector(selector) {
  return (dispatch) => {
    dispatch({
      type: types.EDIT_MAP_SELECTOR,
      selector: selector
    });
  };
}
