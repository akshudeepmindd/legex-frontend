import $http from '../../utils/api';
import {
  FETCH_ORGANIZATIONS, FETCH_ORGANIZATION, CREATE_ORGANIZATION, UPDATE_ORGANIZATION, DELETE_ORGANIZATION,
  REQUEST_FAILURE,
} from '../constants/organizations';

export const requestFailure = (error) => ({
  type: REQUEST_FAILURE,
  payload: error,
})

export function fetchOrganizations() {
  return async (dispatch) => {
    dispatch({type: FETCH_ORGANIZATIONS});
    try {
      const response = $http({ url: '/organizations', method: 'GET' });
      return response;
    } catch (error) {
      dispatch(requestFailure(error));
    }
  }
}

export function fetchOrganization(payload) {
  return async (dispatch) => {
    dispatch({type: FETCH_ORGANIZATION});
    try {
      const response = $http({ url: `/organizations/${payload}`, method: 'GET' });
      return response;
    } catch (error) {
      dispatch(requestFailure(error));
    }
  }
}

export function createOrganization(payload) {
  return async (dispatch) => {
    dispatch({type: CREATE_ORGANIZATION});
    try {
      const response = $http({ url: '/organizations', data: payload, method: 'POST' });
      return response;
    } catch (error) {
      dispatch(requestFailure(error));
    }
  }
}

export function updateOrganization(payload) {
  return async (dispatch) => {
    dispatch({type: UPDATE_ORGANIZATION});
    try {
      const response = $http({ url: `/organizations/${payload._id}`, data: payload, method: 'PUT' });
      return response;
    } catch (error) {
      dispatch(requestFailure(error));
    }
  }
}

export function deleteOrganization(payload) {
  return async (dispatch) => {
    dispatch({ type: DELETE_ORGANIZATION });
    try {
      const response = $http({ url: `/organizations/${payload._id}`, method: 'DELETE' });
      return response;
    } catch (error) {
      dispatch(requestFailure(error));
    }
  }
}
