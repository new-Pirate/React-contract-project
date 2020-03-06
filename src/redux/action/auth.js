import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT } from '../types/auth';
import { AUTH_API } from '../../api/api';

const API = new AUTH_API();

export const authRequest = () => {
  return {
    type: LOGIN_REQUEST
  };
};

export const authSuccess = (payload) => {
  return {
    type: LOGIN_SUCCESS,
    payload
  };
};

export const authFailed = (payload) => {
  return {
    type: LOGIN_FAILED,
    payload
  };
};

export const logout = () => {
  return {
    type: LOGOUT
  };
};

// Инициируем экшны
export const getAuthData = (params) => (dispatch) => {
  dispatch(authRequest());

  API.post(params)
    .then((res) => {
      dispatch(authSuccess(res));
    })
    .catch((err) => (
      dispatch(authFailed(err))
    ));
};
