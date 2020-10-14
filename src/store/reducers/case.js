import { FETCH_CASE_START, FETCH_CASE_SUCCESS } from "../constants/case";

const initialState = null;

export default function caseReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CASE_SUCCESS:
      return action.payload;
    case FETCH_CASE_START:
    default:
      return state;
  }
}
