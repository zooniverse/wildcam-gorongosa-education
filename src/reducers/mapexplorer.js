import * as types from '../constants/actionTypes';
export const initialState = {
  species: [],
  habitats: [],
  seasons: [],
  dateStart: '',
  dateEnd: '',
  timesOfDay: [],
  distanceToHumansMin: '',
  distanceToHumansMax: '',
  distanceToWaterMin: '',
  distanceToWaterMax: '',
  user: '',
  camera: '',
  viewCameraMode: false,
  selectForAssignmentMode: false,
};

export function mapexplorer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_MAP_FILTER_VALUE':
      const addedData = {};
      if (Array.isArray(state[action.key])) {
        let newVal = state[action.key].slice();
        if (!newVal.includes(action.val)) {
          newVal.push(action.val);
        }
        addedData[action.key] = newVal;
      } else {
        addedData[action.key] = action.val;
      }
      return Object.assign({}, state, addedData);
    
    case 'REMOVE_MAP_FILTER_VALUE':
      const removedData = {};
      if (Array.isArray(state[action.key])) {
        removedData[action.key] = state[action.key].filter(ele => {
            return ele !== action.val
          });
      } else {
        removedData[action.key] = '';
      }
      return Object.assign({}, state, removedData);
    
    case 'ENABLE_VIEW_CAMERA_MODE':
      return Object.assign({}, state, {
        camera: action.camera,
        viewCameraMode: true,
      });
      
    case 'DISABLE_VIEW_CAMERA_MODE':
      return Object.assign({}, state, {
        camera: '',
        viewCameraMode: false,
      });
      
    case 'ENABLE_SELECT_FOR_ASSIGNMENT_MODE':
      return Object.assign({}, state, {
        selectForAssignmentMode: true,
      });
      
    case 'DISABLE_SELECT_FOR_ASSIGNMENT_MODE':
      return Object.assign({}, state, {
        selectForAssignmentMode: false,
      });
      
    default:
      return state;
  }
}
