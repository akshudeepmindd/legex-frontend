import {
  FETCH_INVITES, FETCH_INVITE, CREATE_INVITE, UPDATE_INVITE, DELETE_INVITE,
  REQUEST_FAILURE,
} from '../constants/invites';

export const initialState = {
  invites: {},
  invite: [],
  loading: false,
  error: {}
}
export default function inviteReducers(state = initialState, action) {
  switch (action.type) {
    case FETCH_INVITES:
      return { ...state, invites: action.payload, loading: true }

    case FETCH_INVITE:
      return { ...state, invite: action.payload, loading: true }

    case CREATE_INVITE:
      return { ...state, loading: true }

    case UPDATE_INVITE:
      return { ...state, loading: true }

    case DELETE_INVITE:
      return { ...state, loading: true }

    case REQUEST_FAILURE:
      return { ...state, error: action.payload, loading: false }

    default:
      return state;
  }
}
