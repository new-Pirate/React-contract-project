import {
  GET_TOKEN,
  GET_TOKEN_SUCCESS,
  GET_TOKEN_FAIL,
  LOGOUT
} from '../types/auth';

const initialState = {
  error: null,
  loading: false,
  isLoggedIn: !!document.cookie
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_TOKEN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case GET_TOKEN_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null
      };
    }
    case GET_TOKEN_FAIL:
      return {
        ...state,
        loading: false,
        error: payload
      };
    case LOGOUT:
      return {
        ...state
      };
    default:
      return state;
  }
};

export default reducer;
