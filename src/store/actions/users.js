import $http from '../../utils/api';
import {
  FETCH_USERS,
  FETCH_USER,
  USERS_SUCCESS,
  USER_SUCCESS,
  REQUEST_FAILURE,
} from '../constants/users';

export const usersSuccess = (users) => ({
  type: USERS_SUCCESS,
  payload: users,
});

export const userSuccess = (user) => ({
  type: USER_SUCCESS,
  payload: user,
});

export const requestFailure = (error) => ({
  type: REQUEST_FAILURE,
  payload: error,
});

export function fetchUsers() {
  return async (dispatch) => {
    dispatch({ type: FETCH_USERS });
    try {
      const response = await $http({
        url: '/users',
        method: 'GET',
      });
      dispatch(usersSuccess(response.data));
    } catch (error) {
      dispatch(requestFailure(error));
    }
  };
}

export function fetchUser(payload) {
  return async (dispatch) => {
    dispatch({ type: FETCH_USER });
    try {
      const response = await $http({
        url: `/users/${payload}`,
        method: 'GET',
      });
      dispatch(userSuccess(response.data));
    } catch (error) {
      dispatch(requestFailure(error));
    }
  };
}
