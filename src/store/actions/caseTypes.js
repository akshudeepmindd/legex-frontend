import $http from '../../utils/api';
import {
  FETCH_CASE_TYPES, FETCH_CASE_TYPE, CREATE_CASE_TYPE, UPDATE_CASE_TYPE, DELETE_CASE_TYPE,
  REQUEST_FAILURE,
} from '../constants/caseTypes';

export const requestFailure = (error) => ({
  type: REQUEST_FAILURE,
  payload: error,
})

export function fetchCaseTypes() {
  return async (dispatch) => {
    dispatch({type: FETCH_CASE_TYPES});
    try {
      const response = $http({ url: '/case-types', method: 'GET' });
      return response;
    } catch (error) {
      dispatch(requestFailure(error));
    }
  }
}

export function fetchCaseType(payload) {
  return async (dispatch) => {
    dispatch({type: FETCH_CASE_TYPE});
    try {
      const response = $http({ url: `/case-types/${payload}`, method: 'GET' });
      return response;
    } catch (error) {
      dispatch(requestFailure(error));
    }
  }
}

export function createCaseType(payload) {
  return async (dispatch) => {
    dispatch({type: CREATE_CASE_TYPE});
    try {
      const response = $http({ url: `/case-types`, data: payload, method: 'POST' });
      return response;
    } catch (error) {
      dispatch(requestFailure(error));
    }
  }
}

export function updateCaseType(payload) {
  return async (dispatch) => {
    dispatch({type: UPDATE_CASE_TYPE});
    try {
      const response = $http({ url: `/case-types/${payload._id}`, data: payload, method: 'PUT' });
      return response;
    } catch (error) {
      dispatch(requestFailure(error));
    }
  }
}

export function deleteCaseType(payload) {
  return async (dispatch) => {
    dispatch({ type: DELETE_CASE_TYPE });
    try {
      const response = $http({ url: `/case-types/${payload._id}`, method: 'DELETE' });
      return response;
    } catch (error) {
      dispatch(requestFailure(error));
    }
  }
}
