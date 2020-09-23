import {
  LOGIN_USER,
  REGISTER_USER,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  GOOGLE_OAUTH,
  FACEBOOK_OAUTH,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  LOGOUT_USER,
} from "../constants/auth";

export const initialState = {
  user: {},
  loading: false,
  error: {},
  token: "" || localStorage.getItem("access-token"),
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loading: true };

    case REGISTER_USER:
      return { ...state, loading: true };

    case RESET_PASSWORD:
      return { ...state, loading: true };

    case FORGOT_PASSWORD:
      return { ...state, loading: true };

    case GOOGLE_OAUTH:
      return { ...state, loading: true };

    case FACEBOOK_OAUTH:
      return { ...state, loading: true };

    case AUTH_SUCCESS:
      return {
        user: action.payload.data,
        token: action.payload.token,
        loading: false,
      };

    case AUTH_FAILURE:
      return { error: action.payload, loading: false };

    case LOGOUT_USER:
      return initialState;

    default:
      return state;
  }
}
