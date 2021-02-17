import { ADMIN_LOGIN_START } from '../constants/admin'

export const initialState = null

export default function adminReducer(state = initialState, action) {
  switch (action.type) {
    case ADMIN_LOGIN_START:
      return state

    // case LOGIN_USER_SUCCESS:
    // case REGISTER_USER_SUCCESS:
    //   return true

    // case AUTH_FAILURE:
    // case LOGOUT_USER:
    //   return initialState

    default:
      return state
  }
}
