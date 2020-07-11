import {
  FETCH_CASES, FETCH_CASE, CREATE_CASE, UPDATE_CASE, DELETE_CASE,
  REQUEST_SUCCESS, REQUEST_FAILURE,
} from '../constants/cases';

export const initialState = {
  case: {},
  cases: [],
  loading: false,
  error: {}
}

export default function caseReducers(state = initialState, action) {
  switch (action.type) {
    case FETCH_CASES:
      return { ...state, cases: action.payload, loading: true }

    case FETCH_CASE:
      return { ...state, case: action.payload, loading: true }

    case CREATE_CASE:
      return { ...state, loading: true }

    case UPDATE_CASE:
      return { ...state, loading: true }

    case DELETE_CASE:
      return { ...state, loading: true }

    case REQUEST_FAILURE:
      return { ...state, error: action.payload, loading: false }

    default:
      return state;
  }
}
