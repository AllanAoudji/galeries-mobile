import { combineReducers } from 'redux';

import confirmAccountFieldsErrorReducer from './confirmAccountFieldsErrorReducer';
import confirmAccountStatusReducer from './confirmAccountStatusReducer';

// eslint-disable-next-line import/prefer-default-export
export const confirmAccountReducers = combineReducers({
    fieldsError: confirmAccountFieldsErrorReducer,
    status: confirmAccountStatusReducer,
});
