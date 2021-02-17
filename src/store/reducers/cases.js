import {
  FETCH_CASES_START,
  FETCH_CASES_SUCCESS,
  CREATE_CASE_START,
  CREATE_CASE_SUCCESS,
  ADD_CASE,
} from "../constants/cases";
import { QUIT_CASE_SUCCESS } from "../constants/case";
export const initialState = null;

export default function casesReducers(state = initialState, action) {
  switch (action.type) {
    case FETCH_CASES_SUCCESS:
      return action.payload;

    case ADD_CASE:
    case CREATE_CASE_SUCCESS:
      return { ...state, newcase: action.payload };

    case QUIT_CASE_SUCCESS:
      return state.filter((c) => c._id !== action.payload._id);

    case FETCH_CASES_START:
    case CREATE_CASE_START:
    default:
      return state;
  }
}
