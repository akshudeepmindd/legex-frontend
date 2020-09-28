import $http from "../../utils/api";
import {
  FETCH_ORGANIZATIONS,
  FETCH_ORGANIZATION,
  CREATE_ORGANIZATION,
  UPDATE_ORGANIZATION,
  DELETE_ORGANIZATION,
  ORGANIZATIONS_SUCCESS,
  ORGANIZATION_SUCCESS,
  REQUEST_FAILURE,
} from "../constants/organizations";

export const requestFailure = (error) => ({
  type: REQUEST_FAILURE,
  payload: error,
});

export const organizationsSuccess = (organizations) => ({
  type: ORGANIZATIONS_SUCCESS,
  payload: organizations,
});

export const organizationSuccess = (organization) => ({
  type: ORGANIZATION_SUCCESS,
  payload: organization,
});

export function fetchOrganizations() {
  return async (dispatch) => {
    dispatch({ type: FETCH_ORGANIZATIONS });
    try {
      const response = await $http()({ url: "/organizations", method: "GET" });
      return dispatch(organizationsSuccess(response.data.data));
    } catch (error) {
      return dispatch(requestFailure(error));
    }
  };
}

export function fetchOrganization(payload) {
  return async (dispatch) => {
    dispatch({ type: FETCH_ORGANIZATION });
    try {
      const response = await $http()({
        url: `/organizations/${payload}`,
        method: "GET",
      });
      return dispatch(organizationSuccess(response.data.data));
    } catch (error) {
      return dispatch(requestFailure(error));
    }
  };
}

export function createOrganization(payload) {
  return async (dispatch) => {
    dispatch({ type: CREATE_ORGANIZATION });
    try {
      //will return organization object with only members & owner id
      const response = await $http()({
        url: "/organizations",
        data: payload,
        method: "POST",
      });
      return dispatch(organizationSuccess(response.data.data));
    } catch (error) {
      return dispatch(requestFailure(error));
    }
  };
}

export function updateOrganization(payload) {
  return async (dispatch) => {
    dispatch({ type: UPDATE_ORGANIZATION });
    try {
      const response = await $http({
        url: `/organizations/${payload._id}`,
        data: payload,
        method: "PUT",
      });
      return dispatch(organizationSuccess(response.data.data));
    } catch (error) {
      return dispatch(requestFailure(error));
    }
  };
}

export function deleteOrganization(payload) {
  return async (dispatch) => {
    dispatch({ type: DELETE_ORGANIZATION });
    try {
      console.log(payload);
      const response = await $http()({
        url: `/organizations/${payload}`,
        method: "DELETE",
      });
      dispatch(organizationSuccess(response.data.data));
      return response.data;
    } catch (error) {
      return dispatch(requestFailure(error));
    }
  };
}
