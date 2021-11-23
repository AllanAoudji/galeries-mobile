import { combineReducers } from 'redux';

import confirmAccountStatusReducer from './confirmAccountStatusReducer';

// eslint-disable-next-line import/prefer-default-export
export const confirmAccountReducers = combineReducers({
    state: confirmAccountStatusReducer,
});
