import {
  // FORGOT_PASSWORD,
  // RESET_PASSWORD,
  // GOOGLE_OAUTH,
  // FACEBOOK_OAUTH,
  // AUTH_SUCCESS,
  AUTH_FAILURE,
  LOGOUT_USER,
  LOGIN_USER_START,
  REGISTER_USER_START,
  LOGIN_USER_SUCCESS,
  REGISTER_USER_SUCCESS,
} from "../constants/auth";

export const initialState = null;

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER_START:
    case REGISTER_USER_START:
      return state;

    case LOGIN_USER_SUCCESS:
    case REGISTER_USER_SUCCESS:
      return true;

    case AUTH_FAILURE:
    case LOGOUT_USER:
      return initialState;

    default:
      return state;
  }
}
