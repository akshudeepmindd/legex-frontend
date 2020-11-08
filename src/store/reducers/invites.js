import { RESPOND_INVITATION_START } from "../constants/invites"

export const initialState = null

export default function inviteReducers(state = initialState, action) {
	switch (action.type) {
		case RESPOND_INVITATION_START:
		default:
			return state
	}
}
