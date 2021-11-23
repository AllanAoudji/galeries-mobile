import { combineReducers } from 'redux';

import resetPasswordCurrentReducer from './resetPasswordCurrentReducer';
import resetPasswordFieldErrorsReducer from './resetPasswordFieldErrorsReducer';
import resetPasswordStatusReducer from './resetPasswordStatusReducer';

// eslint-disable-next-line import/prefer-default-export
export const resetPasswordReducers = combineReducers({
    current: resetPasswordCurrentReducer,
    fieldsError: resetPasswordFieldErrorsReducer,
    status: resetPasswordStatusReducer,
});
