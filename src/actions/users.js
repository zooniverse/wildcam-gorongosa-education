import { browserHistory } from 'react-router';
import fetch from 'isomorphic-fetch';
import Panoptes from 'panoptes-client';

import { eduAPI } from '../constants/config.json';
import * as types from '../constants/actionTypes';

export function fetchUserDetails(userId) {
  return dispatch => {
    dispatch({
      type: types.REQUEST_USER,
    });
    return fetch(eduAPI.root + eduAPI.users + userId, {
      method: 'GET',
      mode: 'cors',
      headers: new Headers({
        'Authorization': Panoptes.apiClient.headers.Authorization,
        'Content-Type': 'application/json'
      })
    })
    .then(response => response.json())
    .then(json => console.log('USER DATA: ', json.data))
    .catch(response => console.log('RESPONSE-error: ', response))
  }
}

export function upsertTeacherMetadata(userId, data) {
  return dispatch => {
    dispatch({
      type: types.UPSERT_TEACHER_METADATA,
      data
    });
    return fetch(eduAPI.root + eduAPI.users + userId, {
      method: 'PUT',
      mode: 'cors',
      headers: new Headers({
        'Authorization': Panoptes.apiClient.headers.Authorization,
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        'data': {
          'attributes': {
            'metadata': {
              'country': data
            }
          }
        }
      })
    })
    .then(response => response.json())
    .then(json => console.log('DATA: ', json.data))
    .catch(response => console.log('RESPONSE-error: ', response))
  };
}

//{
//      dispatch({
//        type: types.UPSERT_TEACHER_METADATA_SUCCESS,
//        data: json.data,
//      });
//      browserHistory.push('/teachers/classrooms/new');
//    }
