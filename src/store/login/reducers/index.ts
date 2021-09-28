import { combineReducers } from 'redux';
import loginFieldsErrorReducer from './loginFieldsErrorReducer';

// eslint-disable-next-line import/prefer-default-export
export const loginReducer = combineReducers({
    fieldsError: loginFieldsErrorReducer,
});
