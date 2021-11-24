import { combineReducers } from 'redux';

import sendBetaKeyStatusReducer from './sendBetaKeyStatusReducer';

// eslint-disable-next-line import/prefer-default-export
export const sendBetaKeyReducers = combineReducers({
    status: sendBetaKeyStatusReducer,
});
