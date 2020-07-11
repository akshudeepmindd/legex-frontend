import $http from '../../utils/api';
import {
  FETCH_INVITES, FETCH_INVITE, CREATE_INVITE, UPDATE_INVITE, DELETE_INVITE,
  REQUEST_FAILURE,
} from '../constants/invites';

export const requestFailure = (error) => ({
  type: REQUEST_FAILURE,
  payload: error,
})

export function fetchInvites() {
  return async (dispatch) => {
    dispatch({type: FETCH_INVITES});
    try {
      const response = $http({ url: '/invites', method: 'GET' });
      return response;
    } catch (error) {
      dispatch(requestFailure(error));
    }
  }
}

export function fetchInvite(payload) {
  return async (dispatch) => {
    dispatch({type: FETCH_INVITE});
    try {
      const response = $http({ url: `/invites/${payload}`, method: 'GET' });
      return response;
    } catch (error) {
      dispatch(requestFailure(error));
    }
  }
}

export function createInvite(payload) {
  return async (dispatch) => {
    dispatch({type: CREATE_INVITE});
    try {
      const response = $http({ url: `/invites`, data: payload, method: 'POST' });
      return response;
    } catch (error) {
      dispatch(requestFailure(error));
    }
  }
}

export function updateInvite(payload) {
  return async (dispatch) => {
    dispatch({type: UPDATE_INVITE});
    try {
      const response = $http({ url: `/invites/${payload._id}`, data: payload, method: 'PUT' });
      return response;
    } catch (error) {
      dispatch(requestFailure(error));
    }
  }
}

export function deleteInvite(payload) {
  return async (dispatch) => {
    dispatch({ type: DELETE_INVITE });
    try {
      const response = $http({ url: `/invites/${payload._id}`, method: 'DELETE' });
      return response;
    } catch (error) {
      dispatch(requestFailure(error));
    }
  }
}
