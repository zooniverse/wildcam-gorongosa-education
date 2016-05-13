import { browserHistory } from 'react-router';
import fetch from 'isomorphic-fetch';
import Panoptes from 'panoptes-client';

import config from '../constants/config';
import * as types from '../constants/actionTypes';


// Action creators

export function createClassroom(name, subject, school, description) {
  return dispatch => {
    dispatch({
      type: types.CREATE_CLASSROOM,
      name,
      subject,
      school,
      description
    });
    return fetch(config.eduAPI.root + config.eduAPI.teachers, {
      method: 'POST',
      mode: 'cors',
      headers: new Headers({
          'Authorization': Panoptes.apiClient.headers.Authorization,
          'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        'data': {
          'attributes': {
            'name': name,
            'subject': subject,
            'school': school,
            'description': description,
          }
        }
      })
    })
    .then(response => response.json())
    .then(json => {
      dispatch({
        type: types.CREATE_CLASSROOM_SUCCESS,
        data: json.data,
        members: json.included,
      });
      browserHistory.push(`/teachers/classrooms/${json.data.id}`);
    })
    .catch(response => console.log('RESPONSE-error: ', response))
  };
}

export function fetchClassrooms() {
  return dispatch => {
    dispatch({
      type: types.REQUEST_CLASSROOMS,
    });
    return fetch(config.eduAPI.root + config.eduAPI.teachers, {
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
        error: false,
        members: json.included,
      }))
      .catch(response => dispatch({
        type: types.RECEIVE_CLASSROOMS,
        data: [],
        error: true,
      })
    );
  }
}

export function deleteClassroom(classroomId) {
  return dispatch => {
    dispatch({
      type: types.CLASSROOM_DELETE,
      classroomId,
    });
    browserHistory.push('/teachers/classrooms');
  }
}

export function deleteStudent(classroomId, studentId) {
  return dispatch => {
    dispatch({
      type: types.DELETE_STUDENT,
      classroomId,
      studentId,
    });
    browserHistory.push('/teachers/classrooms/' + classroomId);
  }
}

