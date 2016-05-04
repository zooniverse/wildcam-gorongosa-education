import * as types from '../constants/actionTypes';

const initialState = { selectors: [] };

export function map(state = initialState, action) {
  switch (action.type) {
    case types.ADD_MAP_SELECTOR:
      return {
        selectors: []
      };
    case types.REMOVE_MAP_SELECTOR:
      return state;
    case types.EDIT_MAP_SELECTOR:
      return state;
    default:
      return state;
  }
}
