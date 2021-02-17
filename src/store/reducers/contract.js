import {
  FETCH_CONTRACTCASES,
  FETCH_CONTRACTCASE,
  CREATE_CONTRACTCASE,
  UPDATE_CONTRACTCASE,
  ADD_CASE,
  INVITE_PARTY_START,
  INVITE_PARTY_SUCCESS,
  QUIT_CONTRACTCASE,
  QUIT_CASE_SUCCESS,
  CREATE_CONTRACT_CASE_SUCCESS,
  FETCH_CONTRACT_CASES_SUCCESS,
} from "../constants/contract";
export const initialState = null;

export default function contractReducers(state = initialState, action) {
  switch (action.type) {
    case FETCH_CONTRACT_CASES_SUCCESS:
      return action.payload;
    case CREATE_CONTRACT_CASE_SUCCESS:
      return [...state, action.payload];
    case FETCH_CONTRACTCASES:
    case CREATE_CONTRACTCASE:
    default:
      return state;
  }
}
