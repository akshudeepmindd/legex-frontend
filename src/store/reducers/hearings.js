import {
  FETCH_HEARINGS, FETCH_HEARING, CREATE_HEARING, UPDATE_HEARING, DELETE_HEARING,
  REQUEST_FAILURE,
} from '../constants/hearings';

export const initialState = {
  hearings: {},
  hearing: [],
  loading: false,
  error: {}
}
export default function hearingReducers(state = initialState, action) {
  switch (action.type) {
    case FETCH_HEARINGS:
      return { ...state, hearings: action.payload, loading: true }

    case FETCH_HEARING:
      return { ...state, hearing: action.payload, loading: true }

    case CREATE_HEARING:
      return { ...state, loading: true }

    case UPDATE_HEARING:
      return { ...state, loading: true }

    case DELETE_HEARING:
      return { ...state, loading: true }

    case REQUEST_FAILURE:
      return { ...state, error: action.payload, loading: false }

    default:
      return state;
  }
}
