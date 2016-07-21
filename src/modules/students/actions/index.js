import { browserHistory } from 'react-router';
import fetch from 'isomorphic-fetch';
import apiClient from 'panoptes-client/lib/api-client';

import config from '../../../constants/config';
import * as types from '../../../constants/actionTypes';


// Action creators
export function joinClassroom(id, token) {
  return dispatch => {
    dispatch({
      type: types.JOIN_CLASSROOM
    });
    return fetch(config.eduAPI.root + config.eduAPI.students + id + '/join', {
      method: 'POST',
      mode: 'cors',
      headers: new Headers({
        'Authorization': apiClient.headers.Authorization,
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({'join_token': token})
    })
    .then(response => response.json())
    .then(json => dispatch({
      type: types.JOIN_CLASSROOM_SUCCESS,
      data: json.data,
      members: json.included
    }))
    .then(() => browserHistory.push('/students/classrooms/'))
    .catch(response => console.log('RESPONSE-error: ', response))
  };

}

export function fetchStudentClassrooms() {
  return dispatch => {
    dispatch({
      type: types.REQUEST_STUDENT_CLASSROOMS,
    });
    return fetch(config.eduAPI.root + config.eduAPI.students, {
      method: 'GET',
      mode: 'cors',
      headers: new Headers({
          'Authorization': apiClient.headers.Authorization,
          'Content-Type': 'application/json'
        })
      })
      .then(response => response.json())
      .then(json => dispatch({
        type: types.RECEIVE_STUDENT_CLASSROOMS,
        data: json.data,
        error: false,
        members: json.included,
      }))
      .catch(response => dispatch({
        type: types.RECEIVE_STUDENT_CLASSROOMS,
        data: [],
        error: true,
      })
    );
  }
}

export function fetchStudentAssignments() {
  return dispatch => {
    dispatch({
      type: types.REQUEST_ASSIGNMENTS,
    });
    return fetch(config.eduAPI.root + config.eduAPI.assignments, {
      method: 'GET',
      mode: 'cors',
      headers: new Headers({
          'Authorization': apiClient.headers.Authorization,
          'Content-Type': 'application/json'
        })
      })
      .then(response => response.json())
      .then(json => dispatch({
        type: types.RECEIVE_ASSIGNMENTS,
        data: json.data,
      }))
      .catch(response => dispatch({
        type: types.RECEIVE_ASSIGNMENTS_ERROR,
        data: [],
      }));
  }
}
