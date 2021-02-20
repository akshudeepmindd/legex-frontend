import { message } from "antd";
import $http from "../../utils/api";
import {
  FETCH_CASE_START,
  FETCH_CASE_SUCCESS,
  INVITE_PARTY_START,
  INVITE_PARTY_SUCCESS,
  QUIT_CASE_START,
  QUIT_CASE_SUCCESS,
} from "../constants/case";

const fetchCaseSuccess = (c) => ({
  type: FETCH_CASE_SUCCESS,
  payload: c,
});

const invitePartySuccess = (payload) => ({
  type: INVITE_PARTY_SUCCESS,
  payload,
});

const quitCaseSuccess = (payload) => ({
  type: QUIT_CASE_SUCCESS,
  payload,
});

export function fetchCase(payload) {
  return async (dispatch) => {
    const messageKey = "fetch case";
    dispatch({ type: FETCH_CASE_START });
    try {
      //message.loading({ content: "loading case..", key: messageKey })
      const response = await $http()({
        url: `/cases/${payload}`,
        method: "GET",
      });
      if (!response.data.success) throw new Error(response.data.message);
      dispatch(fetchCaseSuccess(response.data.data));
      //message.success({ content: "loaded case", key: messageKey })
    } catch (error) {
      message.error({ content: error.message, key: messageKey });
    }
  };
}

export function inviteParty(payload) {
  return async (dispatch) => {
    dispatch({ type: INVITE_PARTY_START });
    const messageKey = "invite party";
    try {
      const response = await $http()({
        url: `/invites/`,
        data: payload,
        method: "POST",
      });
      if (!response.data.success) throw new Error(response.data.message);
      dispatch(invitePartySuccess(response.data.data));
      return true;
    } catch (error) {
      console.error(error.message);
      message.error({ content: error.message, key: messageKey });
      return false;
    }
  };
}

export function quitCase(payload) {
  return async (dispatch) => {
    //console.log(payload)
    dispatch({ type: QUIT_CASE_START });
    const messageKey = "quit case";
    try {
      const response = await $http()({
        url: `/cases/${payload}`,
        method: "DELETE",
      });
      if (!response.data.success) throw new Error(response.data.message);
      dispatch(quitCaseSuccess(response.data.data));
      return true;
    } catch (error) {
      message.error({ content: error.message, key: messageKey });
      return false;
    }
  };
}


