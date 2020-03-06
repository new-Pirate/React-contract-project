import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT } from '../types/auth';

const initialState = {
  loading: false,
  error: false,
  isLoggedIn: false
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case LOGIN_REQUEST:
      return { ...state,
        loading: true,
        error: false
      };

    case LOGIN_SUCCESS:
      return { ...state,
        loading: false,
        error: false,
        isLoggedIn: true
      };

    case LOGIN_FAILED:
      return { ...state,
        loading: false,
        error: payload.message,
        isLoggedIn: false
      };

    case LOGOUT:
      return { ...state,
        isLoggedIn: false
      };

    default:
      return state;
  }
};

