import { browserHistory } from 'react-router';
import fetch from 'isomorphic-fetch';
import apiClient from 'panoptes-client/lib/api-client';

import config from '../constants/config';
import * as types from '../constants/actionTypes';


// Action creators

export function createClassroom(classroom) {
  return dispatch => {
    const createAction = { ...classroom, type: types.CREATE_CLASSROOM };
    dispatch(createAction);

    return fetch(config.eduAPI.root + config.eduAPI.teachers, {
      method: 'POST',
      mode: 'cors',
      headers: new Headers({
        'Authorization': apiClient.headers.Authorization,
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        data: {
          attributes: classroom
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
    .catch(response => console.log('RESPONSE-error: ', response));
  };
}

export function editClassroom(fields, classroomId) {
  return dispatch => {
    const createAction = { ...fields, type: types.EDIT_CLASSROOM };
    dispatch(createAction);
    return fetch(config.eduAPI.root + config.eduAPI.teachers + classroomId, {
      method: 'PUT',
      mode: 'cors',
      headers: new Headers({
        'Authorization': apiClient.headers.Authorization,
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        data: {
          attributes: fields
        }
      })
    })
    .then(response => {
      dispatch({
        type: types.EDIT_CLASSROOM_SUCCESS,
        fields: fields,
        classroomId: classroomId,
      });
      browserHistory.push(`/teachers/classrooms/${classroomId}`);
    } )
    .catch(response => console.log('RESPONSE-error: ', response));
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
          'Authorization': apiClient.headers.Authorization,
          'Content-Type': 'application/json'
        })
      })
      .then(response => response.json())
      .then(json => dispatch({
        type: types.RECEIVE_CLASSROOMS,
        data: json.data,
        error: false,
        loading: false,
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
    });
    return fetch(config.eduAPI.root + config.eduAPI.teachers + classroomId, {
      method: 'DELETE',
      mode: 'cors',
      headers: new Headers({
          'Authorization': apiClient.headers.Authorization,
          'Content-Type': 'application/json'
        })
    })
    .then(response => {
      if (response.ok) {
        dispatch({
          type: types.CLASSROOM_DELETE_SUCCESS,
          classroomId,
          loading: false,
          error: false,
        });
        browserHistory.push('/teachers/classrooms');
      }
    })
    .catch(response => dispatch({
      type: types.CLASSROOM_DELETE_ERROR,
      error: console.log('DELETE-ERROR: ', response),
      })
    );
  }
}
