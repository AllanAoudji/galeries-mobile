import { combineReducers } from 'redux';
import loginFieldsErrorReducer from './loginFieldsErrorReducer';
import loginStatusReducer from './loginStatusReducer';

// eslint-disable-next-line import/prefer-default-export
export const loginReducer = combineReducers({
    fieldsError: loginFieldsErrorReducer,
    status: loginStatusReducer,
});
