import {
  FETCH_CASE_TYPES,
  FETCH_CASE_TYPE,
  CREATE_CASE_TYPE,
  UPDATE_CASE_TYPE,
  DELETE_CASE_TYPE,
  CASE_TYPES_SUCCESS,
  CASE_TYPE_SUCCESS,
  REQUEST_FAILURE,
} from '../constants/caseTypes';

export const initialState = {
  //caseTypes: {},
  caseTypes: [{id : 1, name : "Recovery"},
  {id : 2, name : "Family Issues"},
  {id : 3, name : "Incurance Claim"},
  {id : 4, name : "Debt Recovery"},
  {id : 5, name : "Intellectual Property"},
  {id : 6, name : "Software Dispute"},
  {id : 7, name : "Consumer Issue"},
  {id : 8, name : "Real Estate Issues"},
  {id : 9, name : "Rental Recovery"},
  {id : 10, name : "Tenant and Landlord"},
  {id : 11, name : "Employment"},
  {id : 12, name : "Commercial"},
  {id : 13, name : "Contract Disputes"},
  {id : 14, name : "Transnational"},
  {id : 15, name : "Trade Dispute"},
  {id : 16, name : "Monetary Settlements"},
  {id : 16, name : "Other"},
],
  caseType: [],
  loading: false,
  error: {},
};
export default function caseTypeReducers(state = initialState, action) {
  switch (action.type) {
    case FETCH_CASE_TYPES:
      return { ...state, loading: true };

    case FETCH_CASE_TYPE:
      return { ...state, loading: true };

    case CREATE_CASE_TYPE:
      return { ...state, loading: true };

    case UPDATE_CASE_TYPE:
      return { ...state, loading: true };

    case DELETE_CASE_TYPE:
      return { ...state, loading: true };

    case CASE_TYPES_SUCCESS:
      return { ...state, loading: false, caseTypes: action.payload.data };

    case CASE_TYPE_SUCCESS:
      return { ...state, loading: false, caseTypes: action.payload.data };

    case REQUEST_FAILURE:
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
}
