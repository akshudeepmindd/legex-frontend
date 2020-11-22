import { FETCH_CASE_START, FETCH_CASE_SUCCESS, QUIT_CASE_START, QUIT_CASE_SUCCESS } from "../constants/case";

const initialState = null;

export default function caseReducer(state = initialState, action) {
  switch (action.type) {
    case QUIT_CASE_SUCCESS:
    case FETCH_CASE_SUCCESS:
      return action.payload;
    case QUIT_CASE_START:
    case FETCH_CASE_START:
    default:
      return state;
  }
}
