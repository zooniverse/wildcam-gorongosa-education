import { browserHistory } from 'react-router';
import fetch from 'isomorphic-fetch';
import apiClient from 'panoptes-client/lib/api-client';
import { saveAs } from 'browser-filesaver';

const mapConfig = require('../../../constants/mapExplorer.config.json');
import config from '../../../constants/config';
import * as types from '../../../constants/actionTypes';


// Action creators
export function joinClassroom(id, token) {
  return dispatch => {
    dispatch({
      type: types.JOIN_CLASSROOM
    });
    return fetch(config.eduAPI.root + config.eduAPI.students + id + '/join', {
      method: 'POST',
      mode: 'cors',
      headers: new Headers({
        'Authorization': apiClient.headers.Authorization,
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({'join_token': token})
    })
    .then(response => response.json())
    .then(json => dispatch({
      type: types.JOIN_CLASSROOM_SUCCESS,
      data: json.data,
      members: json.included
    }))
    .then(() => browserHistory.push('/students/classrooms/'))
    .catch(response => console.log('RESPONSE-error: ', response))
  };

}

export function fetchStudentClassrooms() {
  return dispatch => {
    dispatch({
      type: types.REQUEST_STUDENT_CLASSROOMS,
    });
    return fetch(config.eduAPI.root + config.eduAPI.students, {
      method: 'GET',
      mode: 'cors',
      headers: new Headers({
          'Authorization': apiClient.headers.Authorization,
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

export function fetchStudentAssignments() {
  return dispatch => {
    dispatch({
      type: types.REQUEST_ASSIGNMENTS,
    });
    return fetch(config.eduAPI.root + config.eduAPI.assignments, {
      method: 'GET',
      mode: 'cors',
      headers: new Headers({
          'Authorization': apiClient.headers.Authorization,
          'Content-Type': 'application/json'
        })
      })
      .then(response => response.json())
      .then(json => dispatch({
        type: types.RECEIVE_ASSIGNMENTS,
        data: json.data,
        student_data: json.included,
      }))
      .catch(response => dispatch({
        type: types.RECEIVE_ASSIGNMENTS_ERROR,
        data: [],
        student_data: [],
      }));
  }
}

// We should probably move the following four methods in /helpers (and refactor some of them).

function downloadCsv(data) {
  if (data) {
    let dataBlob = blobbifyCsvData(data);
    let filename = generateFilename();
    saveAs(dataBlob, filename);
  } else {
    alert('Download CSV Error: no data received');
  }
}

function blobbifyCsvData(data) {
  if (data) {
    let dataBlob = new Blob([data], {type: 'text/csv'});
    return dataBlob;
  }
  return null;
}

function generateFilename(extension = '.csv') {
    let timeString = new Date();
    timeString =
      timeString.getDate() +
      ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'][timeString.getMonth()] +
      timeString.getFullYear();
    return 'wildcam-' + timeString + extension;
}

function csvfyJson(json) {
  //Prepare the column headers
  let data = [];
  let row = [];
  for (let key in json.fields) {
    row.push('"'+key.replace(/"/g, '\\"')+'"');
  }
  row = row.join(',');
  data.push(row);

  //Prepare each row of data
  json.rows.map((rowItem) => {
    let row = [];
    for (let key in json.fields) {
      (json.fields[key].type === 'string' && rowItem[key])
        ? row.push('"'+rowItem[key].replace(/"/g, '\\"')+'"')
        : row.push(rowItem[key]);
    }
    row = row.join(',');
    data.push(row);
  });
  return data = data.join('\n');
}

// Note: we don't need to sotre the classifications data in the store,
// so this action doesn't modify the state and hence there are no corresponding reducers.

export function fetchStudentClassifications(assignment, user) {
  const sqlQuery = 'SELECT cla.*, sub.location FROM ' + mapConfig.cartodb.sqlTableClassifications + ' as cla LEFT JOIN ' + mapConfig.cartodb.sqlTableSubjects + ' as sub ON cla.subject_id = sub.subject_id WHERE user_name =\'' + user.display_name + '\' AND workflow_id =' + assignment.workflow_id;
  console.log('Prepare CSV: ', sqlQuery);
  return (dispatch) => {
    dispatch({
      type: types.REQUEST_STUDENT_CLASSIFICATIONS,
    });
    return fetch(mapConfig.cartodb.sqlApi.replace('{SQLQUERY}', encodeURI(sqlQuery)))
      .then((response) => {
        if (response.status !== 200) {
          throw 'Can\'t reach CartoDB API, HTTP response code ' + response.status;
        }
        return response.json();
      })
      .then(json => {
      dispatch({
          type: types.RECEIVE_STUDENT_CLASSIFICATIONS,
          data: json,
          error: false,
          loading: false,
        });
        downloadCsv(csvfyJson(json));
      })
      .catch(error => dispatch({
        type: types.RECEIVE_STUDENT_CLASSIFICATIONS_ERROR,
        data: [],
        error: error,
        loading: false,
      })
    );
  }
}
