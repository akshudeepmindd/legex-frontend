import { message } from "antd";
import $http from "../../utils/api";
import {
  CREATE_CASE_START,
  CREATE_CASE_SUCCESS,
  FETCH_CASES_START,
  FETCH_CASES_SUCCESS,
  ADD_CASE,
} from "../constants/cases";

const fetchCasesSuccess = (cases) => ({
  type: FETCH_CASES_SUCCESS,
  payload: cases,
});

const createCaseSuccess = (c) => ({
  type: CREATE_CASE_SUCCESS,
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
        url: "/cases",
        data: payload,
        method: "POST",
      });
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

export const addCase = (data) =>({
  type: ADD_CASE,
  payload: data
})

// export function updateCase(payload) {
//   return async (dispatch) => {
//     dispatch({ type: UPDATE_CASE });
//     try {
//       const response = await $http({
//         url: `/cases/${payload._id}`,
//         data: payload,
//         method: "PUT",
//       });
//       return response;
//     } catch (error) {
//       return dispatch(requestFailure(error));
//     }
//   };
// }

// export function deleteCase(payload) {
//   return async (dispatch) => {
//     dispatch({ type: DELETE_CASE });
//     try {
//       const response = await $http({
//         url: `/cases/${payload._id}`,
//         method: "DELETE",
//       });
//       return response;
//     } catch (error) {
//       return dispatch(requestFailure(error));
//     }
//   };
// }

// export function addParty(payload) {
//   return async (dispatch) => {
//     dispatch({ type: ADD_PARTY });
//     try {
//       const response = await $http({
//         url: `/cases/${payload._id}/add-party`,
//         data: payload,
//         method: "PUT",
//       });
//       return dispatch(caseSuccess(response.data.data));
//     } catch (error) {
//       return dispatch(requestFailure(error));
//     }
//   };
// }

// export function removeParty(payload) {
//   return async (dispatch) => {
//     dispatch({ type: REMOVE_PARTY });
//     try {
//       const response = await $http({
//         url: `/cases/${payload._id}/remove-party`,
//         data: payload,
//         method: "PUT",
//       });
//       return dispatch(caseSuccess(response.data.data));
//     } catch (error) {
//       return dispatch(requestFailure(error));
//     }
//   };
// }

// export function makeVerdict(payload) {
//   return async (dispatch) => {
//     dispatch({ type: MAKE_VERDICT });
//     try {
//       const response = await $http({
//         url: `/cases/${payload._id}/make-verdict`,
//         data: payload,
//         method: "PUT",
//       });
//       return dispatch(caseSuccess(response.data.data));
//     } catch (error) {
//       return dispatch(requestFailure(error));
//     }
//   };
// }