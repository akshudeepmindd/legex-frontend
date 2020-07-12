import $http from '../../utils/api';
import {
  FETCH_HEARINGS,
  FETCH_HEARING,
  CREATE_HEARING,
  UPDATE_HEARING,
  DELETE_HEARING,
  REQUEST_FAILURE,
} from '../constants/hearings';

export const requestFailure = (error) => ({
  type: REQUEST_FAILURE,
  payload: error,
});

export function fetchHearings() {
  return async (dispatch) => {
    dispatch({ type: FETCH_HEARINGS });
    try {
      const response = $http({ url: '/hearings', method: 'GET' });
      return response;
    } catch (error) {
      return dispatch(requestFailure(error));
    }
  };
}

export function fetchHearing(payload) {
  return async (dispatch) => {
    dispatch({ type: FETCH_HEARING });
    try {
      const response = $http({ url: `/hearings/${payload}`, method: 'GET' });
      return response;
    } catch (error) {
      return dispatch(requestFailure(error));
    }
  };
}

export function createHearing(payload) {
  return async (dispatch) => {
    dispatch({ type: CREATE_HEARING });
    try {
      const response = $http({
        url: `/hearings`,
        data: payload,
        method: 'POST',
      });
      return response;
    } catch (error) {
      return dispatch(requestFailure(error));
    }
  };
}

export function updateHearing(payload) {
  return async (dispatch) => {
    dispatch({ type: UPDATE_HEARING });
    try {
      const response = $http({
        url: `/hearings/${payload._id}`,
        data: payload,
        method: 'PUT',
      });
      return response;
    } catch (error) {
      return dispatch(requestFailure(error));
    }
  };
}

export function deleteHearing(payload) {
  return async (dispatch) => {
    dispatch({ type: DELETE_HEARING });
    try {
      const response = $http({
        url: `/hearings/${payload._id}`,
        method: 'DELETE',
      });
      return response;
    } catch (error) {
      return dispatch(requestFailure(error));
    }
  };
}
