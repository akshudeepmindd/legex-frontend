import $http from '../../utils/api';
import {
  FETCH_CASE_TYPES,
  FETCH_CASE_TYPE,
  CREATE_CASE_TYPE,
  UPDATE_CASE_TYPE,
  DELETE_CASE_TYPE,
  CASE_TYPES_SUCCESS,
  CASE_TYPE_SUCCESS,
  REQUEST_FAILURE,
} from '../constants/caseTypes';

export const requestFailure = (error) => ({
  type: REQUEST_FAILURE,
  payload: error,
});

export const caseTypesSuccess = (caseTypes) => ({
  type: CASE_TYPES_SUCCESS,
  payload: caseTypes,
});

export const caseTypeSuccess = (caseType) => ({
  type: CASE_TYPE_SUCCESS,
  payload: caseType,
});

export function fetchCaseTypes() {
  return async (dispatch) => {
    dispatch({ type: FETCH_CASE_TYPES });
    try {
      const response = await $http({ url: '/case-types', method: 'GET' });
      return dispatch(caseTypesSuccess(response.data));
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
      return dispatch(caseTypeSuccess(response.data));
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
      return dispatch(caseTypeSuccess(response.data));
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
      return dispatch(caseTypeSuccess(response.data));
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
