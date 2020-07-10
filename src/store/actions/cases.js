import $http from '../../utils/api';
import {
  FETCH_CASES, FETCH_CASE, CREATE_CASE, UPDATE_CASE, DELETE_CASE,
  REQUEST_SUCCESS, REQUEST_FAILURE,
} from '../constants/cases';

export const requestFailure = (error) => ({
  type: REQUEST_FAILURE,
  payload: error,
})

export function fetchCases() {
  return async (dispatch) => {
    dispatch({type: FETCH_CASES});
    try {
      const response = $http({ url: '/cases', method: 'GET' });
      return response;
    } catch (error) {
      dispatch(requestFailure(error));
    }
  }
}

export function fetchCase(payload) {
  return async (dispatch) => {
    dispatch({type: FETCH_CASE});
    try {
      const response = $http({ url: `/cases/${payload}`, method: 'GET' });
      return response;
    } catch (error) {
      dispatch(requestFailure(error));
    }
  }
}

export function createCase(payload) {
  return async (dispatch) => {
    dispatch({type: CREATE_CASE});
    try {
      const response = $http({ url: '/cases', data: payload, method: 'POST' });
      return response;
    } catch (error) {
      dispatch(requestFailure(error));
    }
  }
}

export function updateCase(payload) {
  return async (dispatch) => {
    dispatch({type: UPDATE_CASE});
    try {
      const response = $http({ url: `/cases/${payload._id}`, data: payload, method: 'PUT' });
      return response;
    } catch (error) {
      dispatch(requestFailure(error));
    }
  }
}

export function deleteCase(payload) {
  return async (dispatch) => {
    dispatch({ type: DELETE_CASE });
    try {
      const response = $http({ url: `/cases/${payload._id}`, method: 'DELETE' });
      return response;
    } catch (error) {
      dispatch(requestFailure(error));
    }
  }
}
