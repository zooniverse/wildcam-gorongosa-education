import fetch from 'isomorphic-fetch';
import apiClient from 'panoptes-client/lib/api-client';

import config from '../../../constants/config';
import * as types from '../../../constants/actionTypes';


// Action creators
const { root, programs, programId } = config.eduAPI;

export function fetchProgram() {
  return dispatch => {
    dispatch({
      type: types.REQUEST_PROGRAM,
    });
    return fetch(root + programs + programId, {
      method: 'GET',
      mode: 'cors',
      headers: new Headers({
          'Authorization': apiClient.headers.Authorization,
          'Content-Type': 'application/json'
        })
      })
      .then(response => response.json())
      .then(json => dispatch({
        type: types.RECEIVE_PROGRAM,
        data: json.data,
        error: false,
        loading: false,
      }))
      .catch(response => dispatch({
        type: types.RECEIVE_PROGRAM_ERROR,
        data: {},
        error: true,
      })
    );
  }
}
