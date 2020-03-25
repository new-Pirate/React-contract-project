import {
  FETCH_USERS_LIST_REQUEST,
  FETCH_USERS_LIST_SUCCESS,
  FETCH_USERS_LIST_FAILED,
  FETCH_USER_DETAILS_REQUEST,
  FETCH_USER_DETAILS_SUCCESS,
  FETCH_USER_DETAILS_FAILED,
  SUBMIT_USER_DETAILS_REQUEST,
  SUBMIT_USER_DETAILS_SUCCESS,
  SUBMIT_USER_DETAILS_FAILURE
} from '../types/users';

import { USERS_API } from '../../api/api';

const API = new USERS_API();

export const fetchUserListRequest = () => {
  return {
    type: FETCH_USERS_LIST_REQUEST
  };
};

export const fetchUserListSuccess = (payload) => {
  return {
    type: FETCH_USERS_LIST_SUCCESS,
    payload
  };
};

export const fetchUserListFalied = (payload) => {
  return {
    type: FETCH_USERS_LIST_FAILED,
    payload
  };
};

export const fetchUserDetailsRequest = () => {
  return {
    type: FETCH_USER_DETAILS_REQUEST
  };
};

export const fetchUserDetailsSuccess = (payload) => {
  return {
    type: FETCH_USER_DETAILS_SUCCESS,
    payload
  };
};

export const fetchUserDetailsFalied = (payload) => {
  return {
    type: FETCH_USER_DETAILS_FAILED,
    payload
  };
};

export const submitUserDetailsRequest = () => {
  return {
    type: SUBMIT_USER_DETAILS_REQUEST
  };
};

export const submitUserDetailsSuccess = (payload) => {
  return {
    type: SUBMIT_USER_DETAILS_SUCCESS,
    payload
  };
};

export const submitUserDetailsFalied = (payload) => {
  return {
    type: SUBMIT_USER_DETAILS_FAILURE,
    payload
  };
};

// Инициируем экшены
export const getUsersList = (params) => (dispatch) => {
  dispatch(fetchUserListRequest());

  API.get(params)
    .then((res) => {
      dispatch(fetchUserListSuccess(res));
    })
    .catch((err) => (
      dispatch(fetchUserListFalied(err))
    ));
};

export const getUserDetails = (params) => (dispatch) => {
  dispatch(fetchUserDetailsRequest());

  API.get(params)
    .then((res) => {
      dispatch(fetchUserDetailsSuccess(res));
    })
    .catch((err) => (
      dispatch(fetchUserDetailsFalied(err))
    ));
};


export const submitUserDetails = (url, body) => (dispatch) => {
  dispatch(submitUserDetailsRequest());

  API.put(url, body)
    .then((res) => {
      dispatch(submitUserDetailsSuccess(res));
    })
    .catch((err) => (
      dispatch(submitUserDetailsFalied(err))
    ));
};