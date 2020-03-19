import {
  FETCH_USERS_LIST_REQUEST,
  FETCH_USERS_LIST_SUCCESS,
  FETCH_USERS_LIST_FAILED
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

// Инициируем экшены
export const getUsersData = (params) => (dispatch) => {
  dispatch(fetchUserListRequest());

  API.get(params)
    .then((res) => {
      dispatch(fetchUserListSuccess(res));
    })
    .catch((err) => (
      dispatch(fetchUserListFalied(err))
    ));
};
