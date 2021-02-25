import { ADMIN_USER_LIST, ADMIN_USER_LIST_SUCCESS } from "../constants/admin";
import { message } from "antd";
import $http2 from "../../utils/api2";
import $http from "../../utils/api";

const fetchUserListSuccess = (users) => ({
  type: ADMIN_USER_LIST_SUCCESS,
  payload: users,
});

export function fetchUserList() {
  return async (dispatch) => {
    const messageKey = "fetch users";
    dispatch({ type: ADMIN_USER_LIST });
    try {
      //message.loading({ content: "loading cases..", key: messageKey });
      const response = await $http2()({
        url: "/admin/users",
        method: "GET",
      });
      if (!response.data.success) throw new Error(response.data.message);
      dispatch(fetchUserListSuccess(response.data.data));
      //message.success({ content: "loaded cases", key: messageKey });
    } catch (error) {
      message.error({ content: error.message, key: messageKey });
    }
  };
}
