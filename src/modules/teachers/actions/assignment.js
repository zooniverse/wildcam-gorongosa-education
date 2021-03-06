import { browserHistory } from 'react-router';
import fetch from 'isomorphic-fetch';
import apiClient from 'panoptes-client/lib/api-client';

import config, { env } from '../../../constants/config';
import * as types from '../../../constants/actionTypes';


// Action creators
const { root, assignments, sampleSubjects, workflowId } = config.eduAPI;

export function createAssignment(assignment, classroomId) {
  let subjectData = [];
  let metadata;
  const classroomData = {
    id: classroomId,
    type: 'classrooms',
  };
  const studentData = assignment.students.map(student_id => ({
    id: student_id,
    type: 'student_user',
  }));

  // Carto DB doesn't have staging data. We use hard coded subject ids from the staging WG project and ignore the Carto selection.
  if (env === 'staging' || env === 'development') {
    subjectData = sampleSubjects.map((subject_id) => ({
      id: subject_id,
      type: 'subjects',
    }));

    metadata = {
      classifications_target: assignment.classifications_target,
      description: assignment.description,
      duedate: assignment.duedate,
      filters: assignment.filters,
      subjects: sampleSubjects,
    };
  } else {
    subjectData = assignment.subjects.map(subject_id => ({
      id: subject_id,
      type: 'subjects',
    }));

    metadata = {
      classifications_target: assignment.classifications_target,
      description: assignment.description,
      duedate: assignment.duedate,
      filters: assignment.filters,
      subjects: assignment.subjects,
    };
  }

  const bodyData = JSON.stringify({
    data: {
      attributes: {
        name: assignment.name,
        metadata,
        workflow_id: workflowId
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
  });

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
      body: bodyData,
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

  let studentData = fields.students.map(student_id => ({
    id: student_id,
    type: 'student_user',
  }));

  const bodyData = JSON.stringify({
    data: {
      attributes: {
        name: fields.name,
        metadata: {
          classifications_target: fields.classifications_target,
          description: fields.description,
          duedate: fields.duedate,
          filters:  (assignment.attributes && assignment.attributes.metadata) ? (assignment.attributes.metadata.filters)  : null,
          subjects: (assignment.attributes && assignment.attributes.metadata) ? (assignment.attributes.metadata.subjects) : null,
        }
      },
      relationships: {
        student_users: {
          data: studentData,
        },
      },
    }
  });

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
      body: bodyData
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

