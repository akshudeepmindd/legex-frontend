import $http from '../../utils/api';
import {
  FETCH_PARTIES, FETCH_PARTY, CREATE_PARTY, UPDATE_PARTY, DELETE_PARTY,
  REQUEST_FAILURE,
} from '../constants/parties';

export const requestFailure = (error) => ({
  type: REQUEST_FAILURE,
  payload: error,
});

export function fetchParties() {
  return async (dispatch) => {
    dispatch({type: FETCH_PARTIES});
    try {
      const response = $http({ url: '/parties', method: 'GET' });
      return response;
    } catch (error) {
      dispatch(requestFailure(error));
    }
  }
}

export function fetchParty(payload) {
  return async (dispatch) => {
    dispatch({type: FETCH_PARTY});
    try {
      const response = $http({ url: `/parties/${payload}`, method: 'GET' });
      return response;
    } catch (error) {
      dispatch(requestFailure(error));
    }
  }
}

export function createParty(payload) {
  return async (dispatch) => {
    dispatch({type: CREATE_PARTY});
    try {
      const response = $http({ url: '/parties', data: payload, method: 'POST' });
      return response;
    } catch (error) {
      dispatch(requestFailure(error));
    }
  }
}

export function updateParty(payload) {
  return async (dispatch) => {
    dispatch({type: UPDATE_PARTY});
    try {
      const response = $http({ url: `/parties/${payload._id}`, data: payload, method: 'PUT' });
      return response;
    } catch (error) {
      dispatch(requestFailure(error));
    }
  }
}

export function deleteParty(payload) {
  return async (dispatch) => {
    dispatch({ type: DELETE_PARTY });
    try {
      const response = $http({ url: `/parties/${payload._id}`, method: 'DELETE' });
      return response;
    } catch (error) {
      dispatch(requestFailure(error));
    }
  }
}

