import {
  FETCH_PARTIES,
  FETCH_PARTY,
  CREATE_PARTY,
  UPDATE_PARTY,
  DELETE_PARTY,
  REQUEST_FAILURE,
} from '../constants/parties';

export const initialState = {
  party: {},
  parties: [],
  loading: false,
  error: {},
};
export default function partyReducers(state = initialState, action) {
  switch (action.type) {
    case FETCH_PARTIES:
      return { ...state, parties: action.payload, loading: true };

    case FETCH_PARTY:
      return { ...state, party: action.payload, loading: true };

    case CREATE_PARTY:
      return { ...state, loading: true };

    case UPDATE_PARTY:
      return { ...state, loading: true };

    case DELETE_PARTY:
      return { ...state, loading: true };

    case REQUEST_FAILURE:
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
}
