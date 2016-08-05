import * as types from '../constants/actionTypes';

const initialState = {
  assignments: {
    loading: false,
    data: [],
    error: false,
  }
};

export function assignment(state = initialState, action) {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case types.EDIT_ASSIGNMENT:
      return { ...state,
        assignments: {
          loading: true,
          data: state.assignments.data,
          error: state.assignments.error,
          student_data: state.assignments.student_data,
        }
      }
    case types.EDIT_ASSIGNMENT_SUCCESS:
      const newData = state.assignments.data.map(assignment => {
        if (assignment.id === action.assignment.id) {
          return Object.assign({}, action.assignment, {
            attributes: Object.assign({}, assignment.attributes, {
              name: action.fields.name,
              metadata: {
                description: action.fields.description,
                classifications_target: action.fields.classifications_target,
                duedate: action.fields.duedate,
                filters: action.fields.filters,
                subjects: action.fields.subjects,
                students: action.fields.students,
              },
            })
          });
        }
        return assignment;
      });
      return { ...state,
        assignments: {
          loading: false,
          data: newData,
          error: false,
          student_data: state.assignments.student_data,
        }
      }
    case types.EDIT_ASSIGNMENT_ERROR:
      return { ...state,
        assignments: {
          loading: false,
          data: action.data,
          error: action.error || false,
        }
      }
    case types.CREATE_ASSIGNMENT:
      return { ...state,
        assignments: {
          data: state.assignments.data,
          error: false,
          loading: true,
          student_data: state.assignments.student_data,
        }
      };
    case types.CREATE_ASSIGNMENT_SUCCESS:
      const newlist = state.assignments.data.concat(action.data);
      return { ...state,
        assignments: {
          data: newlist,
          error: false,
          loading: false,
          student_data: state.assignments.student_data,
        }
      };
    case types.CREATE_ASSIGNMENT_ERROR:
      return { ...state,
        assignments: {
          data: [],
          error: action.error,
          loading: false,
          student_data: state.assignments.student_data,
        }
      };
    case types.REQUEST_ASSIGNMENTS:
      return { ...state,
        assignments: {
          data: [],
          error: false,
          loading: true,
          student_data: []
        }
      };
    case types.RECEIVE_ASSIGNMENTS:
      return { ...state,
        assignments: {
          data: action.data,
          error: false,
          loading: false,
          student_data: action.student_data,
        }
      };
    case types.RECEIVE_ASSIGNMENTS_ERROR:
      return { ...state,
        assignments: {
          data: [],
          error: action.error,
          loading: false,
          student_data: []
        }
      };
    case types.ASSIGNMENT_DELETE:
      return { ...state,
        assignments: {
          data: state.assignments.data,
          error: false,
          loading: true,
          student_data: state.assignments.student_data,
        }
      };
    case types.ASSIGNMENT_DELETE_SUCCESS:
      const assignmentsWithoutDeleted = state.assignments.data.filter(assignment => assignment.id !== action.assignmentId);
      newState.assignments.data = assignmentsWithoutDeleted;
      return { ...state,
        assignments: {
          data: newState.assignments.data,
          error: false,
          loading: false,
          student_data: newState.assignments.student_data,
        }
      };
    case types.ASSIGNMENT_DELETE_ERROR:
      return { ...state,
        assignments: {
          data: [],
          error: action.error,
          loading: false,
          student_data: [],
        }
      };
    default:
      return state;
  }
}
