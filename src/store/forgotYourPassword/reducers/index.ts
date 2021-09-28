import { combineReducers } from 'redux';
import forgotYourPasswordFieldsErrorReducer from './forgotYourPasswordFieldsErrorReducer';
import forgotYourPasswordStatusReducer from './forgotYourPasswordStatusReducer';

// eslint-disable-next-line import/prefer-default-export
export const forgotYourPasswordReducer = combineReducers({
    fieldsError: forgotYourPasswordFieldsErrorReducer,
    status: forgotYourPasswordStatusReducer,
});
