import { combineReducers } from 'redux';
import authReduser from './auth';
import userReduser from './user';

export const rootReducer = combineReducers({
  authReduser,
  userReduser
});
