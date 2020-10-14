import { FETCH_CASE_TYPES, CASE_TYPES_SUCCESS } from "../constants/caseTypes";

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
