import {
	DELETE_DOCUMENT_START,
	FETCH_DOCUMENTS_START,
	UPLOAD_DOCUMENT_START,
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
