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
    return fetch(eduAPI.root + eduAPI.teachers, {
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

export function joinClassroom(id, token) {
  return dispatch => {
    dispatch({
      type: types.JOIN_CLASSROOM
    });
    return fetch(eduAPI.root + eduAPI.students + id + '/join', {
      method: 'POST',
      mode: 'cors',
      headers: new Headers({
          'Authorization': Panoptes.apiClient.headers.Authorization,
          'Content-Type': 'application/json'
      }),
      body: JSON.stringify({'join_token': token})
    })
    .then(response => response.json())
    .then(json => {
      console.log('JOIN-RESPONSE: ', json.data);
      browserHistory.push('/students/classrooms/');
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
    return fetch(eduAPI.root + eduAPI.teachers, {
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
        data: json.data,
        included: json.included
      }))
      .catch(response => dispatch({
        type: types.RECEIVE_CLASSROOMS,
        data: [],
        error: true,
      }));

  }
}



