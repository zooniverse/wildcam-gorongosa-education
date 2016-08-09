import * as types from '../constants/actionTypes';
export const initialState = {
  species: []
};

export function mapexplorer(state = initialState, action) {
  switch (action.type) {
    /*case types.ADD_MAP_SELECTOR:
      let newSelectors = state.selectors.slice();
      newSelectors.push(new MapSelector());
      return Object.assign({}, state, {
        selectors: newSelectors,
      });*/
    case 'ADD_MAP_FILTER_VALUE':
      const newData = {};
      if (Array.isArray(state[action.key])) {
        let newVal = state[action.key].slice();
        if (!newVal.includes(action.val)) {
          newVal.push(action.val);
        }
        newData[action.key] = newVal;
      } else {
        newData[action.key] = action.val;
      }
      return Object.assign({}, state, newData);
    default:
      return state;
      
  }
}
