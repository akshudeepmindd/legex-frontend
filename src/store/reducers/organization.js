import { LOGOUT_USER } from "../constants/auth";
import {
  ADD_MEMBER_SUCCESS,
  UPDATE_ORGANIZATION_SUCCESS,
  FETCH_ORGANIZATION_SUCCESS,
  REMOVE_MEMBER_SUCCESS,
  ADD_MEMBER_START,
  REMOVE_MEMBER_START,
  FETCH_ORGANIZATION_START,
  DELETE_ORGANIZATION_START,
  DELETE_ORGANIZATION_SUCCESS,
} from "../constants/organization";
export const initialState = null;

export default function organizationReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_MEMBER_SUCCESS:
    case FETCH_ORGANIZATION_SUCCESS:
    case UPDATE_ORGANIZATION_SUCCESS:
    case REMOVE_MEMBER_SUCCESS:
      return action.payload;
    case LOGOUT_USER:
    case DELETE_ORGANIZATION_SUCCESS:
      return initialState;
    case ADD_MEMBER_START:
    case REMOVE_MEMBER_START:
    case FETCH_ORGANIZATION_START:
    case DELETE_ORGANIZATION_START:
    default:
      return state;
  }
}
