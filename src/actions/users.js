import { browserHistory } from 'react-router';
import fetch from 'isomorphic-fetch';
import apiClient from 'panoptes-client/lib/api-client';

import config from '../constants/config';
import * as types from '../constants/actionTypes';

export function fetchUserDetails(userId) {
  return dispatch => {
    dispatch({
      type: types.REQUEST_USER,
    });
    return fetch(config.eduAPI.root + config.eduAPI.users + userId, {
      method: 'GET',
      mode: 'cors',
      headers: new Headers({
        'Authorization': apiClient.headers.Authorization,
        'Content-Type': 'application/json'
      })
    })
    .then(response => response.json())
    .then(json => dispatch({
        type: types.RECEIVE_USER,
        data: json.data,
      }))
    .catch(response => console.log('RESPONSE-error: ', response))
  }
}

export function upsertTeacherMetadata(userId, data) {
  return dispatch => {
    dispatch({
      type: types.UPSERT_TEACHER_METADATA,
      data
    });
    return fetch(config.eduAPI.root + config.eduAPI.users + userId, {
      method: 'PUT',
      mode: 'cors',
      headers: new Headers({
        'Authorization': apiClient.headers.Authorization,
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        'data': data
      })
    })
    .then(response => {
        if (response.ok) {
          dispatch({
            type: types.UPSERT_TEACHER_METADATA_SUCCESS,
            data
          });
          browserHistory.push('/teachers/classrooms/new');
        }
      }
    )
    .catch(response => console.log('RESPONSE-error: ', response))
  };
}

