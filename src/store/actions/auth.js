/* eslint no-underscore-dangle: 0 */
import { message } from "antd";
import $http from "../../utils/api";

import jwtdecode from "jwt-decode";

import {
  LOGIN_USER_START,
  LOGIN_USER_SUCCESS,
  REGISTER_USER_START,
  REGISTER_USER_SUCCESS,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  GOOGLE_OAUTH,
  FACEBOOK_OAUTH,
  AUTH_FAILURE,
  LOGOUT_USER,
  DELETE_NEUTRAL,
} from "../constants/auth";
import $http2 from "../../utils/api2";

const authSuccess = (user) => ({
  type: "AUTH_SUCCESS",
  payload: user,
});

const loginUserSuccess = (userData) => ({
  type: LOGIN_USER_SUCCESS,
  payload: userData,
});

const registerUserSuccess = (userData) => ({
  type: REGISTER_USER_SUCCESS,
  payload: userData,
});

const authFailure = (error) => ({
  type: AUTH_FAILURE,
  payload: error,
});

export function loginUser(payload) {
  return async (dispatch) => {
    const messageKey = "login user";
    dispatch({ type: LOGIN_USER_START });
    try {
      //message.loading({ content: "logging you in..", key: messageKey });
      const response = await $http()({
        url: "/auth/login",
        data: payload,
        method: "POST",
      });
      if (!response.data.success) throw new Error(response.data.message);
      const { token } = response.data;
      const decodedToken = jwtdecode(token);
      if (decodedToken.user.role) {
        localStorage.setItem("role", decodedToken.user.role);
      } else if (decodedToken.user.isAdmin) {
        localStorage.setItem("isAdmin", decodedToken.user.isAdmin);
      }

      localStorage.setItem("access-token", token);
      dispatch(loginUserSuccess(response.data.data));
      //message.success({ content: "logged in", key: messageKey });
    } catch (error) {
      message.error({ content: error.message, key: messageKey });
    }
  };
}

export function registerUser(payload) {
  return async (dispatch) => {
    const messageKey = "register user";
    dispatch({ type: REGISTER_USER_START });
    try {
      //message.loading({ content: "registering user..", key: messageKey });
      const response = await $http2()({
        url: "admin/auth/register",
        data: payload,
        method: "POST",
      });
      const { token } = response.data;

      localStorage.setItem("access-token", token);
      dispatch(registerUserSuccess(response.data.data));
      //message.success({ content: "register user", key: messageKey });
      return true;
    } catch (error) {
      message.error({ content: error.message, key: messageKey });
      return false;
    }
  };
}

export function createMediator(payload) {
  return async (dispatch) => {
    const messageKey = "register mediator";
    try {
      //message.loading({ content: "registering user..", key: messageKey });
      const response = await $http2()({
        url: "admin/auth/mediator",
        data: payload,
        method: "POST",
      });

      dispatch(registerUserSuccess(response.data.data));
      //message.success({ content: "register user", key: messageKey });
      return response.data;
    } catch (error) {
      message.error({ content: error.message, key: messageKey });
      return false;
    }
  };
}

export function deleteNeutral(payload) {
  return async (dispatch) => {
    const messageKey = "delete neutral";
    dispatch({ type: DELETE_NEUTRAL });
    try {
      const response = await $http2()({
        url: `admin/admins/neutral/${payload.id}`,
        method: "DELETE",
      });
      console.log(response);
    } catch (error) {
      message.error({ content: error.message, key: messageKey });
      return false;
    }
  };
}

export function googleOAuth() {
  return async (dispatch) => {
    dispatch({ type: GOOGLE_OAUTH });
    try {
      const response = await $http()({ url: "/auth/google", method: "GET" });
      dispatch(authSuccess(response));
      return response.data;
    } catch (error) {
      console.error(error);
      dispatch(authFailure(error));
    }
  };
}

export function facebookOAuth() {
  return async (dispatch) => {
    dispatch({ type: FACEBOOK_OAUTH });
    try {
      const response = await $http()({ url: "/auth/facebook", method: "GET" });
      dispatch(authSuccess(response));
    } catch (error) {
      dispatch(authFailure(error));
    }
  };
}

export function forgotPassword(payload) {
  return async (dispatch) => {
    dispatch({ type: FORGOT_PASSWORD });
    try {
      const response = await $http()({
        url: "/auth/forgot-password",
        data: payload,
        method: "POST",
      });
      dispatch(authSuccess(response));
    } catch (error) {
      dispatch(authFailure(error));
    }
  };
}

export function resetPassword(payload) {
  return async (dispatch) => {
    dispatch({ type: RESET_PASSWORD });
    try {
      const response = await $http()({
        url: "/auth/reset-password",
        data: payload,
        method: "POST",
      });
      dispatch(authSuccess(response));
    } catch (error) {
      dispatch(authFailure(error));
    }
  };
}

export function logout(payload) {
  return async (dispatch) => {
    dispatch({ type: LOGOUT_USER });
    try {
      const response = await $http()({
        url: "auth/logout",
        method: "GET",
      });
      dispatch(authSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(authFailure(error));
      return error;
    }
  };
}
