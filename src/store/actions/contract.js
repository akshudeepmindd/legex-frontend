import { message } from "antd";
import $http from "../../utils/api";
import {
  FETCH_CONTRACTCASES,
  FETCH_CONTRACTCASE,
  CREATE_CONTRACTCASE,
  UPDATE_CONTRACTCASE,
  ADD_CASE,
  INVITE_PARTY_START,
  INVITE_PARTY_SUCCESS,
  QUIT_CONTRACTCASE,
  QUIT_CASE_SUCCESS,
  CREATE_CONTRACT_CASE_SUCCESS,
  FETCH_CONTRACT_CASES_SUCCESS,
} from "../constants/contract";

const createContractCaseSuccess = (c) => ({
  type: CREATE_CONTRACT_CASE_SUCCESS,
  payload: c,
});

const fetchContractCasesSuccess = (cases) => ({
  type: FETCH_CONTRACT_CASES_SUCCESS,
  payload: cases,
});

export function fetchContractCases() {
  return async (dispatch) => {
    const messageKey = "fetch cases";
    dispatch({ type: FETCH_CONTRACTCASES });
    try {
      //message.loading({ content: "loading cases..", key: messageKey });
      const response = await $http()({ url: "/contract", method: "GET" });
      if (!response.data.success) throw new Error(response.data.message);
      dispatch(fetchContractCasesSuccess(response.data.data));
      //message.success({ content: "loaded cases", key: messageKey });
    } catch (error) {
      message.error({ content: error.message, key: messageKey });
    }
  };
}

export function createContractCase(payload) {
  return async (dispatch) => {
    const messageKey = "create Contract";
    dispatch({ type: CREATE_CONTRACTCASE });
    try {
      const response = await $http()({
        url: "/contract",
        data: payload,
        method: "POST",
      });
      if (!response.data.success) throw new Error(response.data.message);
      dispatch(createContractCaseSuccess(response.data.data));
      // message.success({
      //   content: "case created successfully",
      //   key: messageKey,
      // });
      return true;
    } catch (error) {
      message.error({ content: error.message, key: messageKey });
      return false;
    }
  };
}
