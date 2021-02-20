import { ADMIN_LOGIN_START, LOGIN_ADMIN_SUCCESS } from "../constants/admin";
import { message } from "antd";
import $http2 from "../../utils/api2";
import jwtdecode from "jwt-decode";

const loginAdminSuccess = (userData) => ({
  type: LOGIN_ADMIN_SUCCESS,
  payload: userData,
});
export function loginUser(payload) {
  console.log(payload, "payload in admin");
  return async (dispatch) => {
    const messageKey = "login user";
    dispatch({ type: ADMIN_LOGIN_START });
    try {
      //message.loading({ content: "logging you in..", key: messageKey });
      const response = await $http2()({
        url: "/admin/auth/login",
        data: payload,
        method: "POST",
      });
      console.log(response, "response inn admin");
      if (!response.data.success) throw new Error(response.data.message);
      const { token } = response.data;
      const decodedToken = jwtdecode(token);
      localStorage.setItem("isAdmin", decodedToken.user.isAdmin);
      localStorage.setItem("access-token", token);
      dispatch(loginAdminSuccess(response.data.data));
      //message.success({ content: "logged in", key: messageKey });
    } catch (error) {
      message.error({ content: error.message, key: messageKey });
    }
  };
}
