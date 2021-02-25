import { ADMIN_USER_LIST, ADMIN_USER_LIST_SUCCESS } from "../constants/admin";

export const initialState = null;

export default function adminUserReducer(state = initialState, action) {
  switch (action.type) {
    case ADMIN_USER_LIST_SUCCESS:
      return action.payload;
    case ADMIN_USER_LIST:
    default:
      return state;
  }
}
