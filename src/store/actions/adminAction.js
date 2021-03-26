import { message } from "antd";
import $http2 from "../../utils/api2";
import {
  CREATE_CASE_START_ADMIN,
  CREATE_CASE_SUCCESS_ADMIN,
  FETCH_CASES_START_ADMIN,
  FETCH_CASES_SUCCESS_ADMIN,
  ADD_CASE_ADMIN,
  UPDATE_CASE_ADMIN,
  FETCH_CASE_START_ADMIN,
  FETCH_CASE_SUCCESS_ADMIN,
  INVITE_PARTY_START_ADMIN,
  INVITE_PARTY_SUCCESS_ADMIN,
  QUIT_CASE_START_ADMIN,
  QUIT_CASE_SUCCESS_ADMIN,
  FETCH_ALL_ORGNIZATIONS,
  FETCH_ALL_ORGNIZATIONS_SUCCESS,
} from "../constants/adminConstant";

const fetchCasesSuccessAdmin = (cases) => ({
  type: FETCH_CASES_SUCCESS_ADMIN,
  payload: cases,
});
const fetchOrgsSuccessAdmin = (cases) => ({
  type: FETCH_ALL_ORGNIZATIONS_SUCCESS,
  payload: cases,
});

const createCaseSuccessAdmin = (c) => ({
  type: CREATE_CASE_SUCCESS_ADMIN,
  payload: c,
});

const caseSuccessAdmin = (c) => ({
  type: "UPDATE_VERDICT_ADMIN",
  payload: c,
});

export function fetchCasesAdmin() {
  return async (dispatch) => {
    const messageKey = "fetch cases";
    dispatch({ type: FETCH_CASES_START_ADMIN });
    try {
      //message.loading({ content: "loading cases..", key: messageKey });
      const response = await $http2()({ url: "/admin/cases", method: "GET" });
      if (!response.data.success) throw new Error(response.data.message);
      return dispatch(fetchCasesSuccessAdmin(response.data.data));
      //message.success({ content: "loaded cases", key: messageKey });
    } catch (error) {
      message.error({ content: error.message, key: messageKey });
    }
  };
}

export function createCaseAdmin(payload) {
  return async (dispatch) => {
    const messageKey = "create case";
    dispatch({ type: CREATE_CASE_START_ADMIN });
    try {
      const response = await $http2()({
        url: "/cases/",
        data: payload,
        method: "POST",
      });
      console.log(payload, "response");
      if (!response.data.success) throw new Error(response.data.message);
      dispatch(createCaseSuccessAdmin(response.data.data));
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

export const addCaseAdmin = (data) => ({
  type: ADD_CASE_ADMIN,
  payload: data,
});

// export function updateCaseAdmin(payload) {
//   return async (dispatch) => {
//     const messageKey = "Update case";
//     dispatch({ type: UPDATE_CASE_ADMIN });
//     try {
//       const response = await $http2()({
//         url: `/admin/cases/${payload._id}`,
//         data: payload,
//         method: "PATCH",
//       });
//       return response;
//     } catch (error) {
//       message.error({ content: error.message, key: messageKey });
//     }
//   };
// }

export function makeVerdictAdmin(payload) {
  console.log(payload, "payloadd");
  return async (dispatch) => {
    const messageKey = "Verdict case";
    dispatch({ type: "MAKE_VERDICT_ADMIN" });
    try {
      const response = await $http2()({
        url: `/admin/cases/${payload._id}/make-verdict`,
        data: payload,
        method: "PATCH",
      });
      return dispatch(caseSuccessAdmin(response.data));
    } catch (error) {
      message.error({ content: error.message, key: messageKey });
    }
  };
}

const fetchCaseSuccessAdmin = (c) => ({
  type: FETCH_CASE_SUCCESS_ADMIN,
  payload: c,
});

const invitePartySuccessAdmin = (payload) => ({
  type: INVITE_PARTY_SUCCESS_ADMIN,
  payload,
});

const quitCaseSuccessAdmin = (payload) => ({
  type: QUIT_CASE_SUCCESS_ADMIN,
  payload,
});

export function fetchCaseAdmin(payload) {
  return async (dispatch) => {
    const messageKey = "fetch case";
    dispatch({ type: FETCH_CASE_START_ADMIN });
    try {
      //message.loading({ content: "loading case..", key: messageKey })
      const response = await $http2()({
        url: `/admin/cases/${payload}`,
        method: "GET",
      });
      if (!response.data.success) throw new Error(response.data.message);
      dispatch(fetchCaseSuccessAdmin(response.data.data));
      //message.success({ content: "loaded case", key: messageKey })
    } catch (error) {
      message.error({ content: error.message, key: messageKey });
    }
  };
}

export function fetchAllOrganisations() {
  return async (dispatch) => {
    const messageKey = "fetch case";
    dispatch({ type: FETCH_ALL_ORGNIZATIONS });
    try {
      //message.loading({ content: "loading case..", key: messageKey })
      const response = await $http2()({
        url: `/admin/orgs`,
        method: "GET",
      });
      if (!response.data.success) throw new Error(response.data.message);
      dispatch(fetchOrgsSuccessAdmin(response.data.data));
      //message.success({ content: "loaded case", key: messageKey })
    } catch (error) {
      message.error({ content: error.message, key: messageKey });
    }
  };
}

export function invitePartyAdmin(payload) {
  return async (dispatch) => {
    dispatch({ type: INVITE_PARTY_START_ADMIN });
    const messageKey = "invite party";
    try {
      const response = await $http2()({
        url: `/invites/`,
        data: payload,
        method: "POST",
      });
      if (!response.data.success) throw new Error(response.data.message);
      dispatch(invitePartySuccessAdmin(response.data.data));
      return true;
    } catch (error) {
      console.error(error.message);
      message.error({ content: error.message, key: messageKey });
      return false;
    }
  };
}

export function quitCaseAdmin(payload) {
  return async (dispatch) => {
    //console.log(payload)
    dispatch({ type: QUIT_CASE_START_ADMIN });
    const messageKey = "quit case";
    try {
      const response = await $http2()({
        url: `/cases/${payload}`,
        method: "DELETE",
      });
      if (!response.data.success) throw new Error(response.data.message);
      dispatch(quitCaseSuccessAdmin(response.data.data));
      return true;
    } catch (error) {
      message.error({ content: error.message, key: messageKey });
      return false;
    }
  };
}

export const updateCseAdmin = (payload) => async (dispatch) => {
  try {
    const messageKey = "Update case";
    const res = await $http2()({
      url: `/admin/cases/updatecase`,
      data: payload,
      method: "PATCH",
    });
    return dispatch(caseSuccessAdmin(res.data));
  } catch (err) {
    message.error({ content: err.message, key: "Update case" });
  }
};
