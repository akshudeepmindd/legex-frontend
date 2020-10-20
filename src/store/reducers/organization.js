import { LOGOUT_USER } from "../constants/auth";
import {
  INVITE_MEMBER_SUCCESS,
  UPDATE_ORGANIZATION_SUCCESS,
  FETCH_ORGANIZATION_SUCCESS,
  REMOVE_MEMBER_SUCCESS,
  LEAVE_ORGANIZATION_SUCCESS,
  DELETE_ORGANIZATION_SUCCESS,
  INVITE_MEMBER_START,
  REMOVE_MEMBER_START,
  LEAVE_ORGANIZATION_START,
  FETCH_ORGANIZATION_START,
  DELETE_ORGANIZATION_START,
  CREATE_ORGANIZATION_CASE_SUCCESS,
  CREATE_ORGANIZATION_CASE_START,
} from "../constants/organization";
export const initialState = null;

export default function organizationReducer(state = initialState, action) {
  switch (action.type) {
    // case INVITE_MEMBER_SUCCESS:
    case FETCH_ORGANIZATION_SUCCESS:
    case UPDATE_ORGANIZATION_SUCCESS:
    case REMOVE_MEMBER_SUCCESS:
    case LEAVE_ORGANIZATION_SUCCESS:
      return action.payload;

    case CREATE_ORGANIZATION_CASE_SUCCESS:
      return { ...state, cases: [...state.cases, action.payload] };

    case LOGOUT_USER:
    case DELETE_ORGANIZATION_SUCCESS:
      return initialState;
    case INVITE_MEMBER_START:
    case REMOVE_MEMBER_START:
    case LEAVE_ORGANIZATION_START:
    case FETCH_ORGANIZATION_START:
    case DELETE_ORGANIZATION_START:
    case CREATE_ORGANIZATION_CASE_START:
    default:
      return state;
  }
}
