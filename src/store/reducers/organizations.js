import {
  FETCH_ORGANIZATIONS,
  FETCH_ORGANIZATION,
  CREATE_ORGANIZATION,
  UPDATE_ORGANIZATION,
  DELETE_ORGANIZATION,
  REQUEST_FAILURE,
} from '../constants/organizations';

export const initialState = {
  organization: {},
  organizations: [],
  loading: false,
  error: {},
};
export default function organizationReducers(state = initialState, action) {
  switch (action.type) {
    case FETCH_ORGANIZATIONS:
      return { ...state, organizations: action.payload, loading: true };

    case FETCH_ORGANIZATION:
      return { ...state, organization: action.payload, loading: true };

    case CREATE_ORGANIZATION:
      return { ...state, loading: true };

    case UPDATE_ORGANIZATION:
      return { ...state, loading: true };

    case DELETE_ORGANIZATION:
      return { ...state, loading: true };

    default:
      return state;
  }
}
