import { message } from "antd";
import $http from "../../utils/api";
import $http2 from "../../utils/api2";
import {
  FETCH_USER_SATRT,
  FETCH_USER_SUCCESS,
  FETCH_USERS_SATRT,
  FETCH_USERS_SUCCESS,
} from "../constants/user";

const fetchUserSuccess = (user) => ({
  type: FETCH_USER_SUCCESS,
  payload: user,
});
const fetchUsersSuccess = (user) => ({
  type: FETCH_USERS_SUCCESS,
  payload: user,
});
export function fetchUser(payload) {
  return async (dispatch) => {
    const messageKey = "fetch user";
    dispatch({ type: FETCH_USER_SATRT });
    try {
      //message.loading({ content: "fetching user details..", key: messageKey });
      const response = await $http()({
        url: `/users/${payload}`,
        method: "GET",
      });
      if (!response.data.success) throw new Error(response.data.message);
      dispatch(fetchUserSuccess(response.data.data));
      //message.success({ content: "loaded user", key: messageKey });
      return response.data.data;
    } catch (error) {
      message.error({ content: error.message, key: messageKey });
    }
  };
}
export function fetchAdminUser(payload) {
  return async (dispatch) => {
    const messageKey = "fetch user";
    dispatch({ type: FETCH_USER_SATRT });
    try {
      //message.loading({ content: "fetching user details..", key: messageKey });
      const response = await $http2()({
        url: `/admin/users//adminuser/${payload}`,
        method: "GET",
      });
      if (!response.data.success) throw new Error(response.data.message);
      dispatch(fetchUserSuccess(response.data.data));
      //message.success({ content: "loaded user", key: messageKey });
      return response.data.data;
    } catch (error) {
      message.error({ content: error.message, key: messageKey });
    }
  };
}
export function updateProfilePic(data) {
  return async (dispatch) => {
    const messageKey = "Profile Photo Update";
    dispatch({ type: "PHOTP_UPDATE_SATRT" });
    try {
      const response = await $http()({
        url: `/users/profile`,
        data: data,
        method: "PATCH",
      });
      if (!response.data.success) throw new Error(response.data.message);
      return true;
    } catch (error) {
      message.error({ content: error.message, key: messageKey });
    }
  };
}
export function fetchUsers() {
  return async (dispatch) => {
    const messageKey = "fetch user";
    dispatch({ type: FETCH_USERS_SATRT });
    try {
      //message.loading({ content: "fetching user details..", key: messageKey });
      const response = await $http()({
        url: `/users/`,
        method: "GET",
      });
      if (!response.data.success) throw new Error(response.data.message);
      dispatch(fetchUsersSuccess(response.data.data));
      //message.success({ content: "loaded user", key: messageKey });
    } catch (error) {
      message.error({ content: error.message, key: messageKey });
    }
  };
}

export function editUser(data) {
  return async (dispatch) => {
    const messageKey = "fetch user";
    dispatch({ type: FETCH_USER_SATRT });
    try {
      //message.loading({ content: "fetching user details..", key: messageKey });
      const response = await $http()({
        url: `/users/${data.payload}`,
        data: data,
        method: "PATCH",
      });
      if (!response.data.success) throw new Error(response.data.message);
      dispatch(fetchUserSuccess(response.data.data));
      //message.success({ content: "loaded user", key: messageKey });
    } catch (error) {
      message.error({ content: error.message, key: messageKey });
    }
  };
}
