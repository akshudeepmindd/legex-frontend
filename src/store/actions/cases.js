import { message } from "antd";
import $http from "../../utils/api";
import {
  CREATE_CASE_START,
  CREATE_CASE_SUCCESS,
  FETCH_CASES_START,
  FETCH_CASES_SUCCESS,
  ADD_CASE,
  UPDATE_CASE,
} from "../constants/cases";

const fetchCasesSuccess = (cases) => ({
  type: FETCH_CASES_SUCCESS,
  payload: cases,
});

const createCaseSuccess = (c) => ({
  type: CREATE_CASE_SUCCESS,
  payload: c,
});
const caseSuccess = (c) => ({
  type: "UPDATE_VERDICT",
  payload: c,
});

export function fetchCases() {
  return async (dispatch) => {
    const messageKey = "fetch cases";
    dispatch({ type: FETCH_CASES_START });
    try {
      //message.loading({ content: "loading cases..", key: messageKey });
      const response = await $http()({ url: "/cases", method: "GET" });
      if (!response.data.success) throw new Error(response.data.message);
      dispatch(fetchCasesSuccess(response.data.data));
      //message.success({ content: "loaded cases", key: messageKey });
    } catch (error) {
      message.error({ content: error.message, key: messageKey });
    }
  };
}

export function createCase(payload) {
  return async (dispatch) => {
    const messageKey = "create case";
    dispatch({ type: CREATE_CASE_START });
    try {
      const response = await $http()({
        url: "/cases/",
        data: payload,
        method: "POST",
      });
      console.log(payload, "response");
      if (!response.data.success) throw new Error(response.data.message);
      dispatch(createCaseSuccess(response.data.data));
      message.success({
        content: "case created successfully",
        key: messageKey,
      });
      return true;
    } catch (error) {
      message.error({ content: error.message, key: messageKey });
      return false;
    }
  };
}

export const addCase = (data) => ({
  type: ADD_CASE,
  payload: data,
});

export function updateCase(payload) {
  return async (dispatch) => {
    const messageKey = "Update case";
    dispatch({ type: UPDATE_CASE });
    try {
      const response = await $http()({
        url: `/cases/${payload._id}/updatecase`,
        data: payload,
        method: "PATCH",
      });
      return response;
    } catch (error) {
      message.error({ content: error.message, key: messageKey });
    }
  };
}

export function makeVerdict(payload) {
  console.log(payload, "payloadd");
  return async (dispatch) => {
    const messageKey = "Verdict case";
    dispatch({ type: "MAKE_VERDICT" });
    try {
      const response = await $http()({
        url: `/cases/${payload._id}/make-verdict`,
        data: payload,
        method: "PATCH",
      });
      return dispatch(caseSuccess(response.data));
    } catch (error) {
      message.error({ content: error.message, key: messageKey });
    }
  };
}

export const updateCse = (payload) => async (dispatch) => {
  try {
    const messageKey = "Update case";
    const res = await $http()({
      url: `/cases/updatecase`,
      data: payload,
      method: "PATCH",
    });
    return dispatch(caseSuccess(res.data));
  } catch (err) {
    message.error({ content: err.message, key: "Update case" });
  }
};
