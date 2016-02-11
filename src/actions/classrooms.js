import fetch from 'isomorphic-fetch';
import Panoptes from 'panoptes-client';

import { eduAPI } from '../constants/config.json';
import * as types from '../constants/actionTypes';


// Constants
export const visibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

// Action creators
export function addClassroom(name) {
  return {
    type: types.CREATE_CLASSROOM,
    name: name,
  };
}

export function setVisibilityFilter(filter) {
  return {
    type: types.SET_VISIBILITY_FILTER,
    filter: filter,
  };
}

function receiveClassrooms(json) {
  console.log('--------receiveClassrooms(json)', json.data.map(classroom => classroom.attributes.name));
  return {
    type: types.RECEIVE_CLASSROOMS,
    classrooms: json.data.map(classroom => classroom.attributes.name)
  }
}

export function fetchClassrooms() {
  // Thunk middleware passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.
  console.log('--------fetchClassrooms');
  console.log('TOKEN: ', Panoptes.auth._bearerToken);

  return dispatch => {
    // First dispatch: the app state is updated to inform that the API call
    // is starting.
    dispatch({
      type: types.REQUEST_CLASSROOMS,
    });

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.
    // In this case, we return a promise to wait for.
    // This is not required, just convenient for us.
    return fetch(eduAPI.root + eduAPI.classrooms, {
      method: 'GET',
      mode: 'cors',
      headers: new Headers({
          'Authorization': 'Bearer ' + Panoptes.auth._bearerToken,
          'Content-Type': 'application/json'
        })
      })
      .then(response => response.json())
      .then(json =>
        // Here, we update the app state with the results of the API call.
        dispatch(receiveClassrooms(json))
      )
      .catch(response => {
        console.error('Something went wrong while requesting the classrooms',
          response);
      });
      // catch any error in the network call.
  }
}

function fetchClassroomsIfNeeded() {
  return (dispatch, getState) => {
    return dispatch(fetchClassrooms());
  }
}
