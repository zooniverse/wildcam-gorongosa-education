import { browserHistory } from 'react-router';
import fetch from 'isomorphic-fetch';
import Panoptes from 'panoptes-client';

import { eduAPI } from '../constants/config.json';
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
    return fetch(eduAPI.root + eduAPI.teachers, {
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
      browserHistory.push('/students/classrooms/');
    })
    .catch(response => console.log('RESPONSE-error: ', response))
  };

}

export function fetchClassrooms() {
  return dispatch => {
    dispatch({
      type: types.REQUEST_CLASSROOMS,
    });
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

export function fetchStudentClassrooms() {
  return dispatch => {
    dispatch({
      type: types.REQUEST_STUDENT_CLASSROOMS,
    });
    return fetch(eduAPI.root + eduAPI.students, {
      method: 'GET',
      mode: 'cors',
      headers: new Headers({
          'Authorization': Panoptes.apiClient.headers.Authorization,
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


//.then(json => {
//      dispatch({
//        type: types.JOIN_CLASSROOM_SUCCESS,
//        loading: true
//      });
//      console.log('JOIN-RESPONSE: ', json.data);
//      // the following reloads the page causing the classroomlist to refresh
//      // not sure if there is a better way that uses react-router methods.
//      window.location.assign('/students/classrooms/')
//    })


