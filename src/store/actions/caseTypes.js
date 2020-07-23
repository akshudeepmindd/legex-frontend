import $http from '../../utils/api';
import {
  FETCH_CASE_TYPES,
  FETCH_CASE_TYPE,
  CREATE_CASE_TYPE,
  UPDATE_CASE_TYPE,
  DELETE_CASE_TYPE,
  REQUEST_SUCCESS,
  REQUEST_FAILURE,
} from '../constants/caseTypes';

export const requestFailure = (error) => ({
  type: REQUEST_FAILURE,
  payload: error,
});

export const requestSuccess = (caseTypes) => ({
  type: REQUEST_SUCCESS,
  payload: caseTypes,
});

export function fetchCaseTypes() {
  return async (dispatch) => {
    dispatch({ type: FETCH_CASE_TYPES });
    try {
      const response = await $http({ url: '/case-types', method: 'GET' });
      return dispatch(requestSuccess(response.data));
    } catch (error) {
      return dispatch(requestFailure(error));
    }
  };
}

export function fetchCaseType(payload) {
  return async (dispatch) => {
    dispatch({ type: FETCH_CASE_TYPE });
    try {
      const response = await $http({
        url: `/case-types/${payload}`,
        method: 'GET',
      });
      return response;
    } catch (error) {
      return dispatch(requestFailure(error));
    }
  };
}

export function createCaseType(payload) {
  return async (dispatch) => {
    dispatch({ type: CREATE_CASE_TYPE });
    try {
      const response = await $http({
        url: `/case-types`,
        data: payload,
        method: 'POST',
      });
      return response;
    } catch (error) {
      return dispatch(requestFailure(error));
    }
  };
}

export function updateCaseType(payload) {
  return async (dispatch) => {
    dispatch({ type: UPDATE_CASE_TYPE });
    try {
      const response = await $http({
        url: `/case-types/${payload._id}`,
        data: payload,
        method: 'PUT',
      });
      return response;
    } catch (error) {
      return dispatch(requestFailure(error));
    }
  };
}

export function deleteCaseType(payload) {
  return async (dispatch) => {
    dispatch({ type: DELETE_CASE_TYPE });
    try {
      const response = await $http({
        url: `/case-types/${payload._id}`,
        method: 'DELETE',
      });
      return response;
    } catch (error) {
      return dispatch(requestFailure(error));
    }
  };
}
