import { message } from "antd";
import $http from "../../utils/api";
import {
  RESPOND_INVITATION_START,
  RESPOND_INVITATION_SUCCESS,
} from "../constants/invites";
import { addCase } from "./cases";
import { addOrganziation } from "./organizations";

const respondInviteSuccess = (data) => ({
  type: RESPOND_INVITATION_SUCCESS,
  payload: data,
});

export function respondInvite(payload) {
  return async (dispatch) => {
    dispatch({ type: RESPOND_INVITATION_START });
    let messageKey = "Invitation respond";
    try {
      //message.loading({ content: "Responding Invitation", key: messageKey })
      const response = await $http()({
        url: `/invites/response/${payload.inviteId}`,
        data: payload.data,
        method: "PUT",
      });
      if (!response.data.success) throw new Error(response.data.message);
      if (payload.invitationType === "Case") addCase(response.data.data);
      else if (payload.invitationType === "Organization")
        addOrganziation(response.data.data);
      dispatch(respondInviteSuccess(payload.inviteId));
      //message.success({ content: "responded Invite", key: messageKey })
    } catch (error) {
      //if request failed. then that means that invite was never meant to be their.
      // so its needs to be deleted.
      // but this condition should never occur.
      //even though if it happens, invite will be deleted from db
      message.error({ content: error.message, key: messageKey });
    }
  };
}
