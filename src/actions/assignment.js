import { browserHistory } from 'react-router';
import fetch from 'isomorphic-fetch';
import apiClient from 'panoptes-client/lib/api-client';

import config from '../constants/config';
import * as types from '../constants/actionTypes';


// Action creators
const { root, assignments } = config.eduAPI;

export function createAssignment(assignment, classroomId) {
  console.log('assignment ', assignment)
  return dispatch => {
    const createAction = { ...assignment, type: types.CREATE_ASSIGNMENT };
    console.log('CREATE ACTION ', createAction)
    dispatch(createAction);
//    dispatch({
//      type: types.CREATE_ASSIGNMENT,
//    });
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
            metadata: {
              classifications_target: assignment.classifications_target,
              description: assignment.description,
              duedate: assignment.duedate,
            }
          },
          relationships: {
            classroom: {
              data: {
                id: classroomId,
                type: 'classrooms'
              }
            },
            student_users: {
              data: [assignment.students]
            },
            subjects: {
              data: [assignment.subjects]
            }
          }
        }
      })
    })
    .then(response => console.log('response.json()', response.json()))
    .then(json => {
      dispatch({
        type: types.CREATE_ASSIGNMENT_SUCCESS,
        data: json.data,
      });
      browserHistory.push( '/assignments/' + json.data.id);
    })
    .catch(response => console.log('RESPONSE-error: ', response));
  };
}
