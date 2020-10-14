import { message } from "antd";
import $http from "../../utils/api";
import {
  FETCH_CASES,
  FETCH_CASE,
  CREATE_CASE,
  UPDATE_CASE,
  DELETE_CASE,
  ADD_PARTY,
  REMOVE_PARTY,
  MAKE_VERDICT,
  CASES_SUCCESS,
  CASE_SUCCESS,
  REQUEST_FAILURE,
} from "../constants/cases";

export const requestFailure = (error) => ({
  type: REQUEST_FAILURE,
  payload: error,
});

export const casesSuccess = (cases) => ({
  type: CASES_SUCCESS,
  payload: cases,
});

export const caseSuccess = (data) => ({
  type: CASE_SUCCESS,
  payload: data,
});

export function fetchCases() {
  return async (dispatch) => {
    dispatch({ type: FETCH_CASES });
    try {
      const response = await $http()({ url: "/cases", method: "GET" });
      console.log(response.data);
      return dispatch(casesSuccess(response.data.data));
    } catch (error) {
      return dispatch(requestFailure(error));
    }
  };
}

export function fetchCase(payload) {
  return async (dispatch) => {
    dispatch({ type: FETCH_CASE });
    try {
      const response = await $http()({
        url: `/cases/${payload}`,
        method: "GET",
      });
      return dispatch(caseSuccess(response.data.data));
    } catch (error) {
      return dispatch(requestFailure(error));
    }
  };
}

export function createCase(payload) {
  return async (dispatch) => {
    const messageKey = "create case";
    dispatch({ type: CREATE_CASE });
    try {
      message.loading({ content: "creating new case...", key: messageKey });
      const response = await $http()({
        url: "/cases",
        data: payload,
        method: "POST",
      });
      if (!response.data.success) throw new Error(response.data.message);
      dispatch(caseSuccess(response.data.data));
      message.success({
        content: "case created successfully",
        key: messageKey,
      });
    } catch (error) {
      message.error({ content: error.message, key: messageKey });
    }
  };
}

export function updateCase(payload) {
  return async (dispatch) => {
    dispatch({ type: UPDATE_CASE });
    try {
      const response = await $http({
        url: `/cases/${payload._id}`,
        data: payload,
        method: "PUT",
      });
      return response;
    } catch (error) {
      return dispatch(requestFailure(error));
    }
  };
}

export function deleteCase(payload) {
  return async (dispatch) => {
    dispatch({ type: DELETE_CASE });
    try {
      const response = await $http({
        url: `/cases/${payload._id}`,
        method: "DELETE",
      });
      return response;
    } catch (error) {
      return dispatch(requestFailure(error));
    }
  };
}

export function addParty(payload) {
  return async (dispatch) => {
    dispatch({ type: ADD_PARTY });
    try {
      const response = await $http({
        url: `/cases/${payload._id}/add-party`,
        data: payload,
        method: "PUT",
      });
      return dispatch(caseSuccess(response.data.data));
    } catch (error) {
      return dispatch(requestFailure(error));
    }
  };
}

export function removeParty(payload) {
  return async (dispatch) => {
    dispatch({ type: REMOVE_PARTY });
    try {
      const response = await $http({
        url: `/cases/${payload._id}/remove-party`,
        data: payload,
        method: "PUT",
      });
      return dispatch(caseSuccess(response.data.data));
    } catch (error) {
      return dispatch(requestFailure(error));
    }
  };
}

export function makeVerdict(payload) {
  return async (dispatch) => {
    dispatch({ type: MAKE_VERDICT });
    try {
      const response = await $http({
        url: `/cases/${payload._id}/make-verdict`,
        data: payload,
        method: "PUT",
      });
      return dispatch(caseSuccess(response.data.data));
    } catch (error) {
      return dispatch(requestFailure(error));
    }
  };
}
