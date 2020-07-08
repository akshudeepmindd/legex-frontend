import $http from '../../utils/api';
import {
  LOGIN_USER, REGISTER_USER, FORGOT_PASSWORD, RESET_PASSWORD, GOOGLE_OAUTH, FACEBOOK_OAUTH,
  AUTH_SUCCESS, AUTH_FAILURE,
} from '../constants/auth';

export const authSuccess = (user) => ({
  type: AUTH_SUCCESS,
  payload: user,
});

export const authFailure = (error) => ({
  type: AUTH_FAILURE,
  payload: error,
});

export function loginUser(payload) {
  return async (dispatch) => {
    dispatch({type: LOGIN_USER});
    try {
      const response = await $http({ url: '/auth/login', data: payload, method: 'POST' });
      dispatch(authSuccess(response));
    } catch (error) {
      dispatch(authFailure(error));
    }
  }
}

export function registerUser(payload) {
  return async (dispatch) => {
    dispatch({type: REGISTER_USER});
    try {
      const response = await $http({ url: '/auth/register', data: payload, method: 'POST' });
      dispatch(authSuccess(response));
    } catch (error) {
      dispatch(authFailure(error));
    }
  }
}

export function googleOAuth(payload) {
  return async (dispatch) => {
    dispatch({type: GOOGLE_OAUTH});
    try {
      const response = await $http({ url: '/auth/google', data: payload, method: 'POST' });
      dispatch(authSuccess(response));
    } catch (error) {
      dispatch(authFailure(error));
    }
  }
}

export function facebookOAuth(payload) {
  return async (dispatch) => {
    dispatch({type: FACEBOOK_OAUTH});
    try {
      const response = await $http({ url: '/auth/facebook', data: payload, method: 'POST' });
      dispatch(authSuccess(response));
    } catch (error) {
      dispatch(authFailure(error));
    }
  }
}

export function forgotPassword(payload) {
  return async (dispatch) => {
    dispatch({type: FORGOT_PASSWORD});
    try {
      const response = await $http({ url: '/auth/forgot-password', data: payload, method: 'POST' });
      dispatch(authSuccess(response));
    } catch (error) {
      dispatch(authFailure(error));
    }
  }
}

export function resetPassword(payload) {
  return async (dispatch) => {
    dispatch({type: RESET_PASSWORD});
    try {
      const response = await $http({ url: '/auth/reset-password', data: payload, method: 'POST' });
      dispatch(authSuccess(response));
    } catch (error) {
      dispatch(authFailure(error));
    }
  }
}
