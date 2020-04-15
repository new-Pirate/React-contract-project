import {
  FETCH_USERS_LIST_REQUEST,
  FETCH_USERS_LIST_SUCCESS,
  FETCH_USERS_LIST_FAILED,
  FETCH_USER_DETAILS_REQUEST,
  FETCH_USER_DETAILS_SUCCESS,
  FETCH_USER_DETAILS_FAILED,
  SUBMIT_USER_DETAILS_REQUEST,
  SUBMIT_USER_DETAILS_SUCCESS,
  SUBMIT_USER_DETAILS_FAILURE,
  DELETE_USER_DETAILS_REQUEST,
  DELETE_USER_DETAILS_SUCCESS,
  DELETE_USER_DETAILS_FAILURE
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
        error: null,
        usersList: []
      };

    case FETCH_USERS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        usersList: payload
      };

    case FETCH_USERS_LIST_FAILED:
    case FETCH_USER_DETAILS_FAILED:
    case SUBMIT_USER_DETAILS_FAILURE:
    case DELETE_USER_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload.message
      };

    case FETCH_USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        details: { ...initialState.details }
      };

    case FETCH_USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        details: payload
      };

    case SUBMIT_USER_DETAILS_REQUEST:
    case DELETE_USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case SUBMIT_USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      };

    case DELETE_USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        details: { ...initialState.details}
      };

    default:
      return state;
  }
};
