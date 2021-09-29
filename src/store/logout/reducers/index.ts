import { combineReducers } from 'redux';
import logoutStatusReducer from './logoutStatusReducer';

// eslint-disable-next-line import/prefer-default-export
export const logoutReducer = combineReducers({
    status: logoutStatusReducer,
});
