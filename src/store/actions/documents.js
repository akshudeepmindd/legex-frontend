import $http from '../../utils/api';
import {
  FETCH_DOCUMENTS, FETCH_DOCUMENT, UPDATE_DOCUMENT, DELETE_DOCUMENT,
  REQUEST_FAILURE,
} from '../constants/documents';

export const requestFailure = (error) => ({
  type: REQUEST_FAILURE,
  payload: error,
})

export function fetchDocuments() {
  return async (dispatch) => {
    dispatch({type: FETCH_DOCUMENTS});
    try {
      const response = $http({ url: '/documents', method: 'GET' });
      return response;
    } catch (error) {
      dispatch(requestFailure(error));
    }
  }
}

export function fetchDocument(payload) {
  return async (dispatch) => {
    dispatch({type: FETCH_DOCUMENT});
    try {
      const response = $http({ url: `/documents/${payload}`, method: 'GET' });
      return response;
    } catch (error) {
      dispatch(requestFailure(error));
    }
  }
}

export function updateDocument(payload) {
  return async (dispatch) => {
    dispatch({type: UPDATE_DOCUMENT});
    try {
      const response = $http({ url: `/documents/${payload._id}`, data: payload, method: 'PUT' });
      return response;
    } catch (error) {
      dispatch(requestFailure(error));
    }
  }
}

export function deleteDocument(payload) {
  return async (dispatch) => {
    dispatch({ type: DELETE_DOCUMENT });
    try {
      const response = $http({ url: `/documents/${payload._id}`, method: 'DELETE' });
      return response;
    } catch (error) {
      dispatch(requestFailure(error));
    }
  }
}
