import {
  GET_TOKEN,
  GET_TOKEN_SUCCESS,
  GET_TOKEN_FAIL,
  LOGOUT
} from '../types/auth';

export function login() {
  return {
    type: GET_TOKEN
  };
}

export function getTokenSuccess(payload) {
  return {
    type: GET_TOKEN_SUCCESS,
    payload
  };
}

export function getTokenFail(payload) {
  return {
    type: GET_TOKEN_FAIL,
    payload
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}
