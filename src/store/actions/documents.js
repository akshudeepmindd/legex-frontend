import $http from "../../utils/api";
import {
  DELETE_DOCUMENT_START,
  DELETE_USER_DOCUMENT_SUCCESS,
  UPLOAD_DOCUMENT_START,
  UPLOAD_USER_DOCUMENT_SUCCESS,
} from "../constants/documents";

import {
  DELETE_ORGANIZATION_DOCUMENT_SUCCESS,
  UPLOAD_ORGANIZATION_DOCUMENT_SUCCESS,
} from "../constants/organization";

export function deleteDocument(payload) {
  return async (dispatch) => {
    dispatch({ type: DELETE_DOCUMENT_START });
    try {
      const response = await $http()({
        url: `/documents/${payload}`,
        method: "delete",
      });
      if (!response.data.success) throw new Error(response.data.message);
      if (response.data.data.ownerType === "Organization") {
        dispatch({
          type: DELETE_ORGANIZATION_DOCUMENT_SUCCESS,
          payload: response.data.data,
        });
      } else if (response.data.data.ownerType === "User") {
        dispatch({
          type: DELETE_USER_DOCUMENT_SUCCESS,
          payload: response.data.data,
        });
      }
      return true;
    } catch (error) {
      return false;
    }
  };
}

export function uploadDocument(payload) {
  return async (dispatch) => {
    dispatch({ type: UPLOAD_DOCUMENT_START });
    try {
      const response = await $http()({
        url: "documents/upload",
        method: "post",
        processData: false,
        data: payload,
      });
      if (!response.data.success) throw new Error(response.data.message);
      if (response.data.data[0].ownerType === "Organization") {
        dispatch({
          type: UPLOAD_ORGANIZATION_DOCUMENT_SUCCESS,
          payload: response.data.data,
        });
      } else if (response.data.data[0].ownerType === "User") {
        dispatch({
          type: UPLOAD_USER_DOCUMENT_SUCCESS,
          payload: response.data.data,
        });
      }
      return true;
    } catch (error) {
      return false;
    }
  };
}
