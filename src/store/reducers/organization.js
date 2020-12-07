import { LOGOUT_USER } from "../constants/auth";
import {
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
  UPLOAD_ORGANIZATION_DOCUMENT_SUCCESS,
  DELETE_ORGANIZATION_DOCUMENT_SUCCESS,
} from "../constants/organization";
export const initialState = null;

export default function organizationReducer(state = initialState, action) {
  switch (action.type) {
    // case INVITE_MEMBER_SUCCESS:
    case FETCH_ORGANIZATION_SUCCESS:
    case REMOVE_MEMBER_SUCCESS:
    case LEAVE_ORGANIZATION_SUCCESS:
      return action.payload;
    case UPDATE_ORGANIZATION_SUCCESS:
		return {...state, name : action.payload.name, domain : action.payload.domain }
    case CREATE_ORGANIZATION_CASE_SUCCESS:
      return { ...state, cases: [...state.cases, action.payload] };

    case UPLOAD_ORGANIZATION_DOCUMENT_SUCCESS:
      return { ...state, documents: [...state.documents, ...action.payload] };

    case DELETE_ORGANIZATION_DOCUMENT_SUCCESS:
      return {
        ...state,
        documents: state.documents.filter((d) => d._id !== action.payload._id),
      };

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
