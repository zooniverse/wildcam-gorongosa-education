import { browserHistory } from 'react-router';
import fetch from 'isomorphic-fetch';
import Panoptes from 'panoptes-client';

import { eduAPI } from '../constants/config.json';
import * as types from '../constants/actionTypes';


// Action creators

export function createClassroom(name) {
  return dispatch => {
    dispatch({
      type: types.CREATE_CLASSROOM,
      name,
    });
    return fetch(eduAPI.root + eduAPI.classrooms, {
      method: 'POST',
      mode: 'cors',
      headers: new Headers({
          'Authorization': Panoptes.apiClient.headers.Authorization,
          'Content-Type': 'application/json'
      }),
      body: JSON.stringify({'data': {'attributes': {'name': name}}})
    })
    .then(response => response.json())
    .then(json => {
      dispatch({
        type: types.CREATE_CLASSROOM_SUCCESS,
        data: json.data
      });
      browserHistory.push(`/teachers/classrooms/${json.data.id}`);
    })
    .catch(response => console.log('RESPONSE-error: ', response))
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
    // This is not required by the middleware.
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
        data: json.data
      }))
      .catch(response => dispatch({
        type: types.RECEIVE_CLASSROOMS,
        data: [],
        error: true,
      }));

  }
}
