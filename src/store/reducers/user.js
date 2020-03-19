import {
  FETCH_USERS_LIST_REQUEST,
  FETCH_USERS_LIST_SUCCESS,
  FETCH_USERS_LIST_FAILED
} from '../types/users';

const initialState = {
  loading: false,
  error: null,
  usersList: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_USERS_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        usersList: []
      };

    case FETCH_USERS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        usersList: payload
      };

    case FETCH_USERS_LIST_FAILED:
      return {
        ...state,
        loading: false,
        error: payload.message
      };

    default:
      return state;
  }
};

