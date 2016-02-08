import { eduApi } from '../constants/app.config.js';
import fetch from 'isomorphic-fetch';
import * as types from '../constants/ActionTypes';

// constants

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

// action creators

export function addClassroom(name) {
  return { type: types.CREATE_CLASSROOM, name }
}

export function setVisibilityFilter(filter) {
  return { type: types.SET_VISIBILITY_FILTER, filter }
}

export const REQUEST_CLASSROOMS = 'REQUEST_CLASSROOMS'
function requestClassrooms(user) {
  return {
    type: REQUEST_CLASSROOMS,
    user
  }
}

export const RECEIVE_CLASSROOMS = 'RECEIVE_CLASSROOMS'
function receiveClassrooms(user, json) {
  return {
    type: RECEIVE_CLASSROOMS,
    user,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}


export function fetchPosts(user) {

  // Thunk middleware passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch) {

    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch(requestClassrooms(user))

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required, just convenient for us.

    return fetch(eduApi.root + eduApi.classrooms)
      .then(response => response.json())
      .then(json =>
        // Here, we update the app state with the results of the API call.
        dispatch(RECEIVE_CLASSROOMS(user, json))
      )

      // catch any error in the network call.
  }
}

