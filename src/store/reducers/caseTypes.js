import {
  FETCH_CASE_TYPES,
  FETCH_CASE_TYPE,
  // CREATE_CASE_TYPE,
  // UPDATE_CASE_TYPE,
  // DELETE_CASE_TYPE,
  CASE_TYPES_SUCCESS,
  CASE_TYPE_SUCCESS,
  REQUEST_FAILURE,
} from "../constants/caseTypes";

export const initialState = {
  caseTypes: [],
  caseType: [],
  loading: false,
  error: {},
};
export default function caseTypeReducers(state = initialState, action) {
  switch (action.type) {
    case FETCH_CASE_TYPES:
      return { ...state, loading: true };

    // case FETCH_CASE_TYPE:
    //   return { ...state, loading: true };

    // case CREATE_CASE_TYPE:
    //   return { ...state, loading: true };

    // case UPDATE_CASE_TYPE:
    //   return { ...state, loading: true };

    // case DELETE_CASE_TYPE:
    //   return { ...state, loading: true };

    case CASE_TYPES_SUCCESS:
      return { ...state, loading: false, caseTypes: action.payload.data };

    // case CASE_TYPE_SUCCESS:
    //   return { ...state, loading: false, caseTypes: action.payload.data };

    default:
      return state;
  }
}
