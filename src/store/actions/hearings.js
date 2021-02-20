import $http from "../../utils/api";
import {
  FETCH_HEARINGS,
  FETCH_HEARING,
  CREATE_HEARING,
  UPDATE_HEARING,
  DELETE_HEARING,
  ADD_DOCUMENT,
  REMOVE_DOCUMENT,
  HEARINGS_SUCCESS,
  HEARING_SUCCESS,
  REQUEST_FAILURE,
} from "../constants/hearings";

export const requestFailure = (error) => ({
  type: REQUEST_FAILURE,
  payload: error,
});

export const hearingsSuccess = (hearings) => ({
  type: HEARINGS_SUCCESS,
  payload: hearings,
});

export const hearingSuccess = (hearing) => ({
  type: HEARING_SUCCESS,
  payload: hearing,
});

export function fetchHearings() {
  return async (dispatch) => {
    dispatch({ type: FETCH_HEARINGS });
    try {
      const response = $http({ url: "/hearings", method: "GET" });
      return dispatch(hearingsSuccess(response.data));
    } catch (error) {
      return dispatch(requestFailure(error));
    }
  };
}

export function fetchHearing(payload) {
  return async (dispatch) => {
    dispatch({ type: FETCH_HEARING });
    try {
      const response = $http({ url: `/hearings/${payload}`, method: "GET" });
      return dispatch(hearingSuccess(response.data));
    } catch (error) {
      return dispatch(requestFailure(error));
    }
  };
}

export function createHearing(payload) {
  return async (dispatch) => {
    dispatch({ type: CREATE_HEARING });
    try {
      const response = await $http()({
        url: `/hearing`,
        data: payload,
        method: "POST",
      });
      // dispatch(hearingSuccess(response.data))
      return response?.data?.data;
    } catch (error) {
      return dispatch(requestFailure(error));
    }
  };
}

export function updateHearing(payload) {
  return async (dispatch) => {
    dispatch({ type: UPDATE_HEARING });
    try {
      const response = $http()({
        url: `/hearings/${payload._id}`,
        data: payload,
        method: "PUT",
      });
      return dispatch(hearingSuccess(response.data));
    } catch (error) {
      return dispatch(requestFailure(error));
    }
  };
}

export function deleteHearing(payload) {
  return async (dispatch) => {
    dispatch({ type: DELETE_HEARING });
    try {
      const response = $http()({
        url: `/hearings/${payload._id}`,
        method: "DELETE",
      });
      return response;
    } catch (error) {
      return dispatch(requestFailure(error));
    }
  };
}

export function addDocument(payload) {
  return async (dispatch) => {
    dispatch({ type: ADD_DOCUMENT });
    try {
      const response = $http({
        url: `/hearings/${payload._id}/add-document`,
        data: payload,
        method: "PUT",
      });
      return dispatch(hearingSuccess(response.data));
    } catch (error) {
      return dispatch(requestFailure(error));
    }
  };
}

export function removeDocument(payload) {
  return async (dispatch) => {
    dispatch({ type: REMOVE_DOCUMENT });
    try {
      const response = $http({
        url: `/hearings/${payload._id}/remove-document`,
        data: payload,
        method: "PUT",
      });
      return dispatch(hearingSuccess(response.data));
    } catch (error) {
      return dispatch(requestFailure(error));
    }
  };
}
