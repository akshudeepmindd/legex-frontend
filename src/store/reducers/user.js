import {
  AUTH_FAILURE,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  REGISTER_USER_SUCCESS,
} from "../constants/auth";
import { FETCH_USER_SUCCESS, FETCH_USER_SATRT } from "../constants/user";

const initialState = null;

export default function userReducers(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_SATRT:
      return state;

    case LOGIN_USER_SUCCESS:
    case REGISTER_USER_SUCCESS:
    case FETCH_USER_SUCCESS:
      return action.payload;

    case LOGOUT_USER:
    case AUTH_FAILURE:
      return initialState;

    default:
      return state;
  }
}
