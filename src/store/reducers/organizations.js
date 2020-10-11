import { LOGOUT_USER } from "../constants/auth";
import {
  FETCH_ORGANIZATIONS_START,
  FETCH_ORGANIZATIONS_SUCCESS,
  CREATE_ORGANIZATION_START,
  CREATE_ORGANIZATION_SUCCESS,
  DELETE_ORGANIZATION_SUCCESS,
  DELETE_ORGANIZATION_START,
} from "../constants/organizations";
import {
  ADD_MEMBER_SUCCESS,
  REMOVE_MEMBER_SUCCESS,
  REMOVE_MEMBER_START,
  UPDATE_ORGANIZATION_SUCCESS,
  LEAVE_ORGANIZATION_SUCCESS
}from "../constants/organization";

export const initialState = null;
export default function organizationsReducers(state = initialState, action) {
  switch (action.type) {
    case FETCH_ORGANIZATIONS_SUCCESS:
      return action.payload;

    case CREATE_ORGANIZATION_SUCCESS:
      return [...state, action.payload];
    
    case LEAVE_ORGANIZATION_SUCCESS:
    case DELETE_ORGANIZATION_SUCCESS:
      return [...state.filter((org) => org._id !== action.payload._id)];
    
    case ADD_MEMBER_SUCCESS:
    case REMOVE_MEMBER_SUCCESS :
    case UPDATE_ORGANIZATION_SUCCESS:
        return  state.map((org) => org._id === action.payload._id ? action.payload : org );  
    
    case LOGOUT_USER:
      return initialState;
    case FETCH_ORGANIZATIONS_START:
    case CREATE_ORGANIZATION_START:
    case DELETE_ORGANIZATION_START:
    case REMOVE_MEMBER_START :
    default:
      return state;
  }
}
