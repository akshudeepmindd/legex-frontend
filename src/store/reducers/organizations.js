// import Organization from "../../views/Dashboard/Organizations/Organization";
import {
  FETCH_ORGANIZATIONS,
  FETCH_ORGANIZATION,
  CREATE_ORGANIZATION,
  UPDATE_ORGANIZATION,
  DELETE_ORGANIZATION,
  ORGANIZATIONS_SUCCESS,
  ORGANIZATION_SUCCESS,
  REQUEST_FAILURE,
  DELETE_ORGANIZATION_SUCCESS,
  ADD_MEMBER,
} from "../constants/organizations";

export const initialState = {
  organization: null,
  organizations: [],
  loading: false,
  error: {},
};

export default function organizationReducers(state = initialState, action) {
  switch (action.type) {
    case FETCH_ORGANIZATIONS:
      return { ...state, loading: true };

    case FETCH_ORGANIZATION:
      return { ...state, loading: true };

    case CREATE_ORGANIZATION:
      return { ...state, loading: true };

    case UPDATE_ORGANIZATION:
      return { ...state, loading: true };

    case DELETE_ORGANIZATION:
      return { ...state, loading: true };

    case ADD_MEMBER:
      return { ...state, loading: true };

    case ORGANIZATIONS_SUCCESS:
      return { ...state, organizations: action.payload, loading: false };

    case ORGANIZATION_SUCCESS:
      return {
        ...state,
        organization: action.payload,
        organizations: [...state.organizations, action.payload],
        loading: false,
      };
    case DELETE_ORGANIZATION_SUCCESS:
      return {
        ...state,
        organizations: state.organizations.filter(
          (org) => org._id != action.payload._id
        ),
        loading: false,
      };

    case REQUEST_FAILURE:
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
}
