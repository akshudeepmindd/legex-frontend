import { message } from "antd";
import $http from "../../utils/api";
import { FETCH_USER_SATRT, FETCH_USER_SUCCESS } from "../constants/user";

const fetchUserSuccess = (user) => ({
  type: FETCH_USER_SUCCESS,
  payload: user,
});
export function fetchUser(payload) {
  return async (dispatch) => {
    const messageKey = "fetch user";
    dispatch({ type: FETCH_USER_SATRT });
    try {
      message.loading({ content: "fetching user details..", key: messageKey });
      const response = await $http()({
        url: `/users/${payload}`,
        method: "GET",
      });
      if (!response.data.success) throw new Error(response.data.message);
      dispatch(fetchUserSuccess(response.data.data));
      message.success({ content: "loaded user", key: messageKey });
    } catch (error) {
      message.error({ content: error.message, key: messageKey });
    }
  };
}
