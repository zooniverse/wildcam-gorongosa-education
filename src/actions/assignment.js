import { browserHistory } from 'react-router';
import fetch from 'isomorphic-fetch';
import apiClient from 'panoptes-client/lib/api-client';

import config from '../constants/config';
import * as types from '../constants/actionTypes';


// Action creators
const { root, assignments } = config.eduAPI;

export function createAssignment(assignment) {
  return dispatch => {
    const createAction = { ...assignment, type: types.CREATE_ASSIGNMENT };
    dispatch(createAction);
    return fetch(root + assignments, {
      method: 'POST',
      mode: 'cors',
      headers: new Headers({
        'Authorization': apiClient.headers.Authorization,
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        data: {}
      })
    })
    .then(response => response.json())
    .then(json => {
      dispatch({
        type: types.CREATE_ASSIGNMENT_SUCCESS,
        data: json.data,
      });
      browserHistory.push( '/assignments/' + json.data.id);
    })
    .catch(response => console.log('RESPONSE-error: ', response));
  };
}
