import { browserHistory } from 'react-router';
import fetch from 'isomorphic-fetch';
import apiClient from 'panoptes-client/lib/api-client';

import config from '../constants/config';
import * as types from '../constants/actionTypes';


// Action creators
const { root, assignments } = config.eduAPI;

export function createAssignment(assignment, classroomId) {

  const classroomData = Object.assign({}, {
      id: classroomId,
      type: 'classrooms',
    })
  const metadata = Object.assign({}, {
    classifications_target: assignment.classifications_target,
    description: assignment.description,
    duedate: assignment.duedate,
  });
  const studentData = assignment.students.map(student_id => { return {id: student_id, type: 'student_user'} });
  const subjectData = assignment.subjects.map(subject_id => { return {id: subject, type: 'subjects'} });

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
            metadata: metadata
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
      console.log('json', json);
      dispatch({
        type: types.CREATE_ASSIGNMENT_SUCCESS,
        data: json.data,
      });
      browserHistory.push( '/assignments/' + json.data.id);
    })
    .catch(response => console.log('RESPONSE-error: ', response));
  };
}
