import {
  FETCH_CASES_START,
  FETCH_CASES_SUCCESS,
  CREATE_CASE_START,
  CREATE_CASE_SUCCESS,
  RESPOND_INVITE_START,
} from "../constants/cases";

export const initialState = null;

export default function casesReducers(state = initialState, action) {
  switch (action.type) {
    case FETCH_CASES_SUCCESS:
      return action.payload;

    case CREATE_CASE_SUCCESS:
      return [...state, action.payload];

    case RESPOND_INVITE_START:
    case FETCH_CASES_START:
    case CREATE_CASE_START:
    default:
      return state;
  }
}
