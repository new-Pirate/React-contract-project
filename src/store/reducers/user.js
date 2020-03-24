import {
  FETCH_USERS_LIST_REQUEST,
  FETCH_USERS_LIST_SUCCESS,
  FETCH_USERS_LIST_FAILED,
  FETCH_USER_DETAILS_REQUEST,
  FETCH_USER_DETAILS_SUCCESS,
  FETCH_USER_DETAILS_FAILED
} from '../types/users';

const initialState = {
  loading: false,
  error: null,
  usersList: [],
  details: {
    id: '',
    name: '',
    username: '',
    email: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
      geo: {
        lat: '',
        lng: ''
      }
    },
    phone: '',
    website: '',
    company: {
      label: '',
      catchPhrase: '',
      bs: ''
    },
    url: ''
  }
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
    case FETCH_USER_DETAILS_FAILED:
      return {
        ...state,
        loading: false,
        error: payload.message
      };

    case FETCH_USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        details: { ...initialState.details }
      };

    case FETCH_USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        details: payload
      };

    default:
      return state;
  }
};

