import { combineReducers } from 'redux';
import * as types from '../constants/ActionTypes';

function appHeader(state = { project : { title: 'Wildcam Gorongosa Education'} }, action) {

  return state
}

function selectedClassroom(state = {}, action ){
  switch (types) {
    case types.SELECT_CLASSROOM :
      return Object.assign({}, state)
    default:
      return state
  }
}

function allClassrooms(state = {
  isFetching: false,
  items: []
}, action) {
  switch (action.type) {
    case types.REQUEST_CLASSROOMS:
      console.log('REDUCERS: REQUEST_CLASSROOMS')
      return Object.assign({}, state, {
        isFetching: true
      })
    case types.RECEIVE_CLASSROOMS:
      console.log('REDUCERS: RECEIVE_CLASSROOMS')
      return Object.assign({}, state, {
        isFetching: false,
        items: action.classrooms
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  appHeader,
  allClassrooms
})

export default rootReducer
