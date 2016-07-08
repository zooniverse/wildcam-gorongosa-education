import { browserHistory } from 'react-router';
import fetch from 'isomorphic-fetch';
import apiClient from 'panoptes-client/lib/api-client';

import config from '../constants/config';
const mapConfig = require('../constants/mapExplorer.config.json');
import * as types from '../constants/actionTypes';


// Action creators
const { root, assignments } = config.eduAPI;

export function addSubjectsToAssignment(sqlQuery) {
  fetch(mapConfig.cartodb.sqlApi.replace('{SQLQUERY}', encodeURI(sqlQuery)))
    .then((response) => {
      if (response.status !== 200) {
        throw 'Can\'t reach CartoDB API, HTTP response code ' + response.status;
      }
      return response.json();
    })
    .then((json) => {
      const subject_ids = json.rows.map((rowItem) => { return rowItem.subject_id });
      localStorage.setItem('subjects_ids', subject_ids);
      //browserHistory.push( '/teachers/classrooms/' + classroomId + /assignment);
    })
    .catch((err) => {
      console.log(err);
    });
}

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
  const subject_ids = localStorage.getItem('subject_ids');
  const subjectData = subject_ids.map(subject_id => ({
    id: subject_id,
    type: 'subjects',
  }));

  return dispatch => {
    dispatch({
      ...assignment,
      type: types.CREATE_ASSIGNMENT
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
      //browserHistory.push( '/assignments/' + json.data.id);
    })
    .catch(response => console.log('RESPONSE-error: ', response));
  };
}
