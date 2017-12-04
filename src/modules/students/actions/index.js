import { browserHistory } from 'react-router';
import fetch from 'isomorphic-fetch';
import apiClient from 'panoptes-client/lib/api-client';
import { saveAs } from 'browser-filesaver';

const mapConfig = require('../../../constants/mapExplorer.config.json');
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
    .then(response => {
      if (response.status < 200 || response.status > 202) { return null; }
      return response.json();
    })
    .then(json => {
      if (json && json.data) {
        dispatch({
          type: types.JOIN_CLASSROOM_SUCCESS,
          data: json.data,
          members: json.included
        });
      } else {
        dispatch({
          type: types.JOIN_CLASSROOM_ERROR
        });
      }
    })
    .then(() => browserHistory.push('/students/'))
    .catch(response => console.log('RESPONSE-error: ', response));
  };

}

export function fetchStudentClassrooms() {
  return dispatch => {
    dispatch({
      type: types.REQUEST_STUDENT_CLASSROOMS,
    });
    return fetch(config.eduAPI.root + config.eduAPI.students + `?program_id=${config.eduAPI.programId}`, {
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
        student_data: json.included,
      }))
      .catch(response => dispatch({
        type: types.RECEIVE_ASSIGNMENTS_ERROR,
        data: [],
        student_data: [],
      }));
  }
}
