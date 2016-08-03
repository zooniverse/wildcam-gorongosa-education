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
    dispatch({
      type: types.CREATE_ASSIGNMENT,
    });
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
      dispatch({
        type: types.CREATE_ASSIGNMENT_SUCCESS,
        data: json.data,
      });
      browserHistory.push(`/teachers/classrooms/${json.data.attributes.classroom_id}`);
      alert('Assignment created!');  //TODO: we need better messaging
    })
    .catch(response => console.log('RESPONSE-error: ', response));
  };
}

export function deleteAssignment(assignmentId, classroomId) {
  return dispatch => {
    dispatch({
      type: types.ASSIGNMENT_DELETE,
    });
    return fetch(root + assignments + assignmentId, {
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
          type: types.ASSIGNMENT_DELETE_SUCCESS,
          assignmentId,
          loading: false,
          error: false,
        });
        browserHistory.push('/teachers/classrooms/' + classroomId);
      }
    })
    .catch(response => dispatch({
      type: types.ASSIGNMENT_DELETE_ERROR,
      error: console.log('ASSIGNMENT_DELETE-ERROR: ', response),
      })
    );
  }
}

export function editAssignment(fields, assignment) {
  return dispatch => {
    dispatch({
      ...fields,
      type: types.EDIT_ASSIGNMENT
    });
    return fetch(root + assignments + assignment.id, {
      method: 'PUT',
      mode: 'cors',
      headers: new Headers({
        'Authorization': apiClient.headers.Authorization,
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        data: {
          attributes: {
            name: fields.name,
            metadata: {
              description: fields.description,
              classifications_target: fields.classifications_target,
              duedate: fields.duedate,
            }
          }
        }
      })
    })
    .then(response => {
      dispatch({
        type: types.EDIT_ASSIGNMENT_SUCCESS,
        fields: fields,
        assignment,
      });
      browserHistory.push('/teachers/classrooms/' + assignment.attributes.classroom_id);
    })
    .catch(response => dispatch({
      type: types.EDIT_ASSIGNMENT_ERROR,
      error: console.log('EDIT_ASSIGNMENT_ERROR: ', response),
      })
    );
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
          student_data: json.included,
        });
      })
      .catch(response => dispatch({
        type: types.RECEIVE_ASSIGNMENTS_ERROR,
        data: [],
        error: response,
        loading: false,
        student_data: []
      })
    );
  }
}

