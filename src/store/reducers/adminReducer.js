import {
  FETCH_CASES_START_ADMIN,
  FETCH_CASES_SUCCESS_ADMIN,
  CREATE_CASE_START_ADMIN,
  CREATE_CASE_SUCCESS_ADMIN,
  ADD_CASE_ADMIN,
  FETCH_CASE_START_ADMIN,
  FETCH_CASE_SUCCESS_ADMIN,
  QUIT_CASE_START_ADMIN,
  QUIT_CASE_SUCCESS_ADMIN,
  FETCH_ALL_ORGNIZATIONS_SUCCESS,
} from "../constants/adminConstant";

export const initialState = null;

export default function adminCaseReducers(state = initialState, action) {
  switch (action.type) {
    
    case FETCH_CASES_SUCCESS_ADMIN:
      return action.payload;

    case ADD_CASE_ADMIN:
    case CREATE_CASE_SUCCESS_ADMIN:
      return [...state, action.payload];

    case QUIT_CASE_SUCCESS_ADMIN:
      return state.filter((c) => c._id !== action.payload._id);

    case FETCH_CASES_START_ADMIN:
    case CREATE_CASE_START_ADMIN:
    case QUIT_CASE_SUCCESS_ADMIN:
      return initialState;

    case FETCH_CASE_SUCCESS_ADMIN:
      return action.payload;

    case QUIT_CASE_START_ADMIN:
    case FETCH_CASE_START_ADMIN:
    default:
      return state;
  }
}
