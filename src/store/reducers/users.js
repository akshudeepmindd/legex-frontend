import {
  FETCH_USERS,
  FETCH_USER,
  USERS_SUCCESS,
  USER_SUCCESS,
  REQUEST_FAILURE,
} from '../constants/users';

export const initialState = {
  user: {},
  loading: false,
  users: [],
  error: {},
};

export default function userReducers(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS:
      return { ...state, loading: true };

    case FETCH_USER:
      return { ...state, loading: true };

    case USERS_SUCCESS:
      return { ...state, users: action.payload.data, loading: false };

    case USER_SUCCESS:
      return { ...state, user: action.payload.data, loading: false };

    case REQUEST_FAILURE:
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
}
