import { browserHistory } from 'react-router';
import fetch from 'isomorphic-fetch';
import Panoptes from 'panoptes-client';

import config from '../constants/config';
import * as types from '../constants/actionTypes';


// Action creators

export function createClassroom(classroom) {
  return dispatch => {
    const createAction = Object.assign({}, classroom, { type: types.CREATE_CLASSROOM });
    dispatch(createAction);

    return fetch(config.eduAPI.root + config.eduAPI.teachers, {
      method: 'POST',
      mode: 'cors',
      headers: new Headers({
        'Authorization': Panoptes.apiClient.headers.Authorization,
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

export function editClassroom(classroom) {
  return dispatch => {
    console.error('Not working yet...');
  //   const createAction = Object.assign({}, classroom, { type: types.EDIT_CLASSROOM });
  //   dispatch(createAction);

  //   return fetch(config.eduAPI.root + config.eduAPI.teachers, {
  //     method: 'POST',
  //     mode: 'cors',
  //     headers: new Headers({
  //       'Authorization': Panoptes.apiClient.headers.Authorization,
  //       'Content-Type': 'application/json'
  //     }),
  //     body: JSON.stringify({
  //       data: {
  //         attributes: classroom
  //       }
  //     })
  //   })
  //   .then(response => response.json())
  //   .then(json => {
  //     dispatch({
  //       type: types.EDIT_CLASSROOM_SUCCESS,
  //       data: json.data,
  //       members: json.included,
  //     });
  //     browserHistory.push(`/teachers/classrooms/${json.data.id}`);
  //   })
  //   .catch(response => console.log('RESPONSE-error: ', response));
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
