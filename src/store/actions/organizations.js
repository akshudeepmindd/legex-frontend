import { message } from "antd";
import $http from "../../utils/api";
import {
  FETCH_ORGANIZATIONS_START,
  FETCH_ORGANIZATIONS_SUCCESS,
  CREATE_ORGANIZATION_START,
  CREATE_ORGANIZATION_SUCCESS,
} from "../constants/organizations";

const createOrganizationSuccess = (organization) => ({
  type: CREATE_ORGANIZATION_SUCCESS,
  payload: organization,
});

const fetchOrganizationsSuccess = (organizations) => ({
  type: FETCH_ORGANIZATIONS_SUCCESS,
  payload: organizations,
});

export function fetchOrganizations() {
  return async (dispatch) => {
    const messageKey = "fetch organization";
    dispatch({ type: FETCH_ORGANIZATIONS_START });
    try {
      message.loading({ content: "fetching organizatios...", key: messageKey });
      const response = await $http()({ url: "/organizations", method: "GET" });
      if (!response.data.success) throw new Error(response.data.message);
      dispatch(fetchOrganizationsSuccess(response.data.data));
      message.success({
        content: "successfully loaded organizations",
        key: messageKey,
      });
    } catch (error) {
      message.error({ content: error.message, key: messageKey });
    }
  };
}

export function createOrganization(payload) {
  return async (dispatch) => {
    const messageKey = "create organization";
    dispatch({ type: CREATE_ORGANIZATION_START });
    try {
      message.loading({ content: "creating organization..", key: messageKey });
      const response = await $http()({
        url: "/organizations",
        data: payload,
        method: "POST",
      });
      if (!response.data.success) throw new Error(response.data.message);
      dispatch(createOrganizationSuccess(response.data.data));
      message.success({ content: "organization created", key: messageKey });
    } catch (error) {
      message.error({ content: error.message, key: messageKey });
    }
  };
}
