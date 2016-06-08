import * as types from '../constants/actionTypes';
import MapSelector from '../containers/MapSelector.jsx';

const initialState = { selectors: [new MapSelector()] };

export function map(state = initialState, action) {
  switch (action.type) {
    case types.ADD_MAP_SELECTOR:
      let newSelectors = state.selectors.slice();
      newSelectors.push(new MapSelector());
      return Object.assign({}, state, {
        selectors: newSelectors,
      });

    case types.REMOVE_MAP_SELECTOR:
      let removedSelectors = state.selectors.filter((selector) => {
        return selector.id !== action.selector.id;
      });
      return Object.assign({}, state, {
        selectors: removedSelectors,
      });

    case types.EDIT_MAP_SELECTOR:
      let editedSelectors = state.selectors.map(selector => {
        return (selector.id === action.selector.id) ? action.selector : selector;
      });
      return Object.assign({}, state, {
        selectors: editedSelectors,
      });

    default:
      return state;
  }
}
