import {
	DELETE_DOCUMENT_START,
	DELETE_USER_DOCUMENT_SUCCESS,
	FETCH_DOCUMENTS_START,
	FETCH_DOCUMENTS_SUCCESS,
	UPLOAD_DOCUMENT_START,
	UPLOAD_USER_DOCUMENT_SUCCESS,
} from "../constants/documents"

export const initialState = []

export default function documentReducers(state = initialState, action) {
	switch (action.type) {
		case UPLOAD_DOCUMENT_START:
		case DELETE_DOCUMENT_START:
		case FETCH_DOCUMENTS_START:
		default:
			return state
	}
}
