import $http from '../../utils/api';
import {
  FETCH_MESSAGES,
  CREATE_MESSAGE,
  UPDATE_MESSAGE,
  DELETE_MESSAGE,
  REQUEST_SUCCESS,
  REQUEST_FAILURE,
} from '../constants/forums';

export const requestFailure = (error) => ({
  type: REQUEST_FAILURE,
  payload: error,
});

export const requestSuccess = (messages) => ({
  type: REQUEST_SUCCESS,
  payload: messages,
});

export function fetchMessages(payload) {
  return async (dispatch) => {
    dispatch({ type: FETCH_MESSAGES });
    try {
      const response = await $http({
        url: `/forums/${payload._id}`,
        method: 'GET',
      });
      return dispatch(requestSuccess(response.data));
    } catch (error) {
      return dispatch(requestFailure(error));
    }
  };
}

export function createMessage(payload) {
  return async (dispatch) => {
    dispatch({ type: CREATE_MESSAGE });
    try {
      const response = await $http({
        url: '/forums',
        data: payload,
        method: 'POST',
      });
      return dispatch(requestSuccess(response.data));
    } catch (error) {
      return dispatch(requestFailure(error));
    }
  };
}

export function updateMessage(payload) {
  return async (dispatch) => {
    dispatch({ type: UPDATE_MESSAGE });
    try {
      const response = await $http({
        url: `/forums/${payload._id}`,
        data: payload,
        method: 'PUT',
      });
      return dispatch(requestSuccess(response.data));
    } catch (error) {
      return dispatch(requestFailure(error));
    }
  };
}

export function deleteMessage(payload) {
  return async (dispatch) => {
    dispatch({ type: DELETE_MESSAGE });
    try {
      const response = await $http({
        url: `/forums/${payload._id}`,
        data: payload,
        method: 'DELETE',
      });
      return dispatch(requestSuccess(response.data));
    } catch (error) {
      return dispatch(requestFailure(error));
    }
  };
}
