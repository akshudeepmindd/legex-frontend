import { ADMIN_LOGIN_START } from '../constants/admin'
import { message } from 'antd'
import $http from '../../utils/api'

const loginAdminSuccess = (userData) => ({
  type: ' LOGIN_USER_SUCCESS',
  payload: userData,
})
export function loginUser(payload) {
  return async (dispatch) => {
    const messageKey = 'login user'
    dispatch({ type: ADMIN_LOGIN_START })
    try {
      //message.loading({ content: "logging you in..", key: messageKey });
      const response = await $http()({
        url: '/admin/auth',
        data: payload,
        method: 'POST',
      })
      if (!response.data.success) throw new Error(response.data.message)
      const { token } = response.data
      localStorage.setItem('access-token', token)
      dispatch(loginAdminSuccess(response.data.data))
      //message.success({ content: "logged in", key: messageKey });
    } catch (error) {
      message.error({ content: error.message, key: messageKey })
    }
  }
}
