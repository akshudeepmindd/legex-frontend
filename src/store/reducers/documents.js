import {
  FETCH_DOCUMENTS,
  FETCH_DOCUMENT,
  UPDATE_DOCUMENT,
  DELETE_DOCUMENT,
  REQUEST_FAILURE,
} from '../constants/documents';

export const initialState = {
  document: {},
  documents: [],
  loading: false,
  error: {},
};

export default function documentReducers(state = initialState, action) {
  switch (action.type) {
    case FETCH_DOCUMENTS:
      return { ...state, documents: action.payload, loading: true };

    case FETCH_DOCUMENT:
      return { ...state, document: action.payload, loading: true };

    case UPDATE_DOCUMENT:
      return { ...state, loading: true };

    case DELETE_DOCUMENT:
      return { ...state, loading: true };

    case REQUEST_FAILURE:
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
}
