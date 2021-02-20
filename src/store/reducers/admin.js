import { ADMIN_LOGIN_START, LOGIN_ADMIN_SUCCESS } from "../constants/admin";

export const initialState = null;

export default function adminReducer(state = initialState, action) {
  switch (action.type) {
    case ADMIN_LOGIN_START:
      return state;

    case LOGIN_ADMIN_SUCCESS:
      return action.payload;

    default:
      return state;
  }
}
