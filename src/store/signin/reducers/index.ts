import { combineReducers } from 'redux';
import signinFieldsErrorReducer from './signinFieldsErrorReducer';
import signinStatusReducer from './signinStatusReducer';

// eslint-disable-next-line import/prefer-default-export
export const signinReducer = combineReducers({
    fieldsError: signinFieldsErrorReducer,
    status: signinStatusReducer,
});
