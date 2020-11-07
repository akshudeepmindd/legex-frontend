import {
	AUTH_FAILURE,
	LOGIN_USER_SUCCESS,
	LOGOUT_USER,
	REGISTER_USER_SUCCESS,
} from "../constants/auth"
import { DELETE_USER_DOCUMENT_SUCCESS, UPLOAD_USER_DOCUMENT_SUCCESS } from "../constants/documents"
import { RESPOND_INVITATION_SUCCESS } from "../constants/invites"
import { FETCH_USER_SUCCESS, FETCH_USER_SATRT } from "../constants/user"

const initialState = null

export default function userReducers(state = initialState, action) {
	switch (action.type) {
		case FETCH_USER_SATRT:
			return state

		case LOGIN_USER_SUCCESS:
		case REGISTER_USER_SUCCESS:
		case FETCH_USER_SUCCESS:
			return action.payload

		case RESPOND_INVITATION_SUCCESS:
			state.invites = state.invites.filter((i) => i !== action.payload)
			return state

		case DELETE_USER_DOCUMENT_SUCCESS:
			return { ...state, documents: state.documents.filter((d) => d._id !== action.payload._id) }

		case UPLOAD_USER_DOCUMENT_SUCCESS:
			return { ...state, documents: [...state.documents, action.payload] }

		case LOGOUT_USER:
		case AUTH_FAILURE:
			return initialState

		default:
			return state
	}
}
