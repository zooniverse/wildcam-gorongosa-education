import { eduApi } from '../constants/app.config.js';
import fetch from 'isomorphic-fetch';
import * as types from '../constants/ActionTypes';
import Panoptes from 'panoptes-client';

// constants

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

// action creators

export function addClassroom(name) {
  return { type: types.CREATE_CLASSROOM, name }
}

export function setVisibilityFilter(filter) {
  return { type: types.SET_VISIBILITY_FILTER, filter }
}



function requestClassrooms() {
  return {
    type: types.REQUEST_CLASSROOMS
  }
}


function receiveClassrooms(json) {
  console.log('--------receiveClassrooms(json)', json.data.map(classroom => classroom.));
  return {
    type: types.RECEIVE_CLASSROOMS,
    classrooms: json.data.map(classroom => classroom.attributes.name)
  }
}


export function fetchClassrooms() {
  // Thunk middleware passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.
  console.log('--------fetchClassrooms');
  console.log('TOKEN: ', Panoptes.auth._bearerToken)
  return dispatch => {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.
    dispatch(requestClassrooms())
    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.
    // In this case, we return a promise to wait for.
    // This is not required, just convenient for us.
    return fetch(eduApi.root + eduApi.classrooms, {
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
      // catch any error in the network call.
  }
}

 function fetchClassroomsIfNeeded(){
  return  (dispatch, getState) => {
    return dispatch(fetchClassrooms())
  }
}

