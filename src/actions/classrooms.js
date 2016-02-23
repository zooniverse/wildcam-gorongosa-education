import fetch from 'isomorphic-fetch';
import Panoptes from 'panoptes-client';

import { eduAPI } from '../constants/config.json';
import * as types from '../constants/actionTypes';


// Action creators
export function addClassroom(name) {
  return {
    type: types.CREATE_CLASSROOM,
    name: name,
  };
}

export function fetchClassrooms() {

  // Thunk middleware passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.
  return dispatch => {
    dispatch({
      type: types.REQUEST_CLASSROOMS,
    });

    // We return a promise to wait for.
    // This is not required by the middleware,
    // just convenient for us.
    return fetch(eduAPI.root + eduAPI.classrooms, {
      method: 'GET',
      mode: 'cors',
      headers: new Headers({
          'Authorization': Panoptes.apiClient.headers.Authorization,
          'Content-Type': 'application/json'
        })
      })

      .then(response => response.json())

      .then(json => dispatch({
        type: types.RECEIVE_CLASSROOMS,
        classrooms: json.data
      }))

      .catch(response => dispatch({
        type: types.RECEIVE_CLASSROOMS,
        classrooms: [],
        error: true,
      }));

  }
}
