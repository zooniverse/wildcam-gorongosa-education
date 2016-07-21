import { browserHistory } from 'react-router';
import fetch from 'isomorphic-fetch';
import apiClient from 'panoptes-client/lib/api-client';

import config from '../../../constants/config';
import * as types from '../../../constants/actionTypes';


// Action creators
const { root, assignments } = config.eduAPI;

export function createAssignment(assignment, classroomId) {
  const classroomData = {
    id: classroomId,
    type: 'classrooms',
  };
  const metadata = {
    classifications_target: assignment.classifications_target,
    description: assignment.description,
    duedate: assignment.duedate,
  };
  const studentData = assignment.students.map(student_id => ({
    id: student_id,
    type: 'student_user',
  }));
  const subjectData = assignment.subjects.map(subject_id => ({
    id: subject_id,
    type: 'subjects',
  }));
  
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
        data: {
          attributes: {
            name: assignment.name,
            metadata,
          },
          relationships: {
            classroom: {
              data: classroomData
            },
            student_users: {
              data: studentData,
            },
            subjects: {
              data: subjectData,
            }
          }
        }
      })
    })
    .then(response => response.json())
    .then(json => {
      console.log('!'.repeat(40));
      console.log(json);
      console.log('!'.repeat(80));
      console.log(json.data);
      dispatch({
        type: types.CREATE_ASSIGNMENT_SUCCESS,
        data: json.data,
      });
      browserHistory.push( `/teachers/classrooms/${json.data.attributes.classroom_id}`);
      alert('Assignment created!');  //TODO: we need better messaging
    })
    .catch(response => console.log('RESPONSE-error: ', response));
  };
}

export function fetchAssignments() {
  return dispatch => {
    dispatch({
      type: types.REQUEST_ASSIGNMENTS,
    });
    return fetch(root + assignments, {
      method: 'GET',
      mode: 'cors',
      headers: new Headers({
          'Authorization': apiClient.headers.Authorization,
          'Content-Type': 'application/json'
        })
      })
      .then(response => response.json())
      .then(json => {
        dispatch({
          type: types.RECEIVE_ASSIGNMENTS,
          data: json.data,
          error: false,
          loading: false,
        });
      })
      .catch(response => dispatch({
        type: types.RECEIVE_ASSIGNMENTS_ERROR,
        data: [],
        error: true,
        loading: false,
      })
    );
  }
}
