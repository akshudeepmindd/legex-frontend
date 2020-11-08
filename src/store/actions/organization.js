import $http from "../../utils/api";
import { message } from "antd";
import {
  INVITE_MEMBER_START,
  INVITE_MEMBER_SUCCESS,
  REMOVE_MEMBER_START,
  REMOVE_MEMBER_SUCCESS,
  UPDATE_ORGANIZATION_START,
  UPDATE_ORGANIZATION_SUCCESS,
  DELETE_ORGANIZATION_START,
  DELETE_ORGANIZATION_SUCCESS,
  LEAVE_ORGANIZATION_START,
  LEAVE_ORGANIZATION_SUCCESS,
  FETCH_ORGANIZATION_START,
  FETCH_ORGANIZATION_SUCCESS,
  CREATE_ORGANIZATION_CASE_SUCCESS,
  CREATE_ORGANIZATION_CASE_START,
} from "../constants/organization";

const fetchOrganizationSuccess = (organization) => ({
  type: FETCH_ORGANIZATION_SUCCESS,
  payload: organization,
});

const deleteOrganizationSuccess = (organization) => ({
  type: DELETE_ORGANIZATION_SUCCESS,
  payload: organization,
});

const leaveOrganizationSuccess = (organization) => ({
  type: LEAVE_ORGANIZATION_SUCCESS,
  payload: organization,
});

const updateOrganizationSuccess = (organization) => ({
  type: UPDATE_ORGANIZATION_SUCCESS,
  payload: organization,
});

const inviteMemberSuccess = (organization) => ({
  type: INVITE_MEMBER_SUCCESS,
  payload: organization,
});

const removeMemberSuccess = (organization) => ({
  type: REMOVE_MEMBER_SUCCESS,
  payload: organization,
});

const createCaseSuccess = (c) => ({
  type: CREATE_ORGANIZATION_CASE_SUCCESS,
  payload: c,
});

export function fetchOrganization(payload) {
  return async (dispatch) => {
    const messageKey = "fetch";
    dispatch({ type: FETCH_ORGANIZATION_START });
    try {
      message.loading({
        content: "fetching organization....",
        key: messageKey,
      });
      const response = await $http()({
        url: `/organizations/${payload}`,
        method: "GET",
      });
      if (!response.data.success) throw new Error(response.data.message);
      dispatch(fetchOrganizationSuccess(response.data.data));
      message.success({
        content: "successfully fetched organization",
        key: messageKey,
      });
    } catch (error) {
      message.error({ content: error.message, key: messageKey });
    }
  };
}

export function createCase(payload) {
  return async (dispatch) => {
    const messageKey = "create case";
    dispatch({ type: CREATE_ORGANIZATION_CASE_START });
    try {
      message.loading({ content: "creating new case...", key: messageKey });
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
    } catch (error) {
      message.error({ content: error.message, key: messageKey });
    }
  };
}

export function inviteMember(payload) {
  return async (dispatch) => {
    dispatch({ type: INVITE_MEMBER_START });
    const messageKey = "invite member";
    try {
      message.loading({ content: "Inviting member..", key: messageKey });
      const response = await $http()({
        url: `/invites/`,
        data: payload,
        method: "POST",
      });
      if (!response.data.success) throw new Error(response.data.message);
      dispatch(inviteMemberSuccess(response.data.data));
      message.success({ content: "member invited", key: messageKey });
    } catch (error) {
      console.error(error.message);
      message.error({ content: error.message, key: messageKey });
    }
  };
}

export function removeMember(payload) {
  return async (dispatch) => {
    dispatch({ type: REMOVE_MEMBER_START });
    const messageKey = "remove member";
    try {
      message.loading({ content: "removing member", key: messageKey });
      const response = await $http()({
        url: `/organizations/${payload.organizationId}/remove-member`,
        data: payload.data,
        method: "PUT",
      });
      if (!response.data.success) throw new Error(response.data.message);
      dispatch(removeMemberSuccess(response.data.data));
      message.success({ content: "member removed", key: messageKey });
    } catch (error) {
      message.error({ content: error.message, key: messageKey });
    }
  };
}

export function leaveOrganization(payload) {
  return async (dispatch) => {
    dispatch({ type: LEAVE_ORGANIZATION_START });
    const messageKey = "leave organization";
    try {
      message.loading({ content: "leaving organization", key: messageKey });
      const response = await $http()({
        url: `/organizations/${payload.organizationId}/leave-organization`,
        data: payload.data,
        method: "PUT",
      });
      if (!response.data.success) throw new Error(response.data.message);
      dispatch(leaveOrganizationSuccess(response.data.data));
      message.success({ content: "left organization", key: messageKey });
    } catch (error) {
      message.error({ content: error.message, key: messageKey });
    }
  };
}

export function updateOrganization(payload) {
  return async (dispatch) => {
    dispatch({ type: UPDATE_ORGANIZATION_START });
    const messageKey = "update organizatin";
    try {
      message.loading({ content: "updating organization", key: messageKey });
      const response = await $http()({
        url: `/organizations/${payload.organizationId}`,
        data: payload.data,
        method: "PUT",
      });
      if (!response.data.success) throw new Error(response.data.message);
      dispatch(updateOrganizationSuccess(response.data.data));
      message.success({ content: "updated organization", key: messageKey });
    } catch (error) {
      message.error({ content: error.message, key: messageKey });
    }
  };
}

export function deleteOrganization(payload) {
  return async (dispatch) => {
    const messageKey = "delete organization";
    dispatch({ type: DELETE_ORGANIZATION_START });
    try {
      message.loading({ content: "deleting organization..", key: messageKey });
      const response = await $http()({
        url: `/organizations/${payload}`,
        method: "DELETE",
      });
      if (!response.data.success) throw new Error(response.data.message);
      dispatch(deleteOrganizationSuccess(response.data.data));
      message.success({ content: "deleted organization", key: messageKey });
      return true;
    } catch (error) {
      message.error({ content: error.message, key: messageKey });
      return false;
    }
  };
}
