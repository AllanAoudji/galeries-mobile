import { combineReducers } from 'redux';

import commentsByIdReducer from './commentsByIdReducer';

// eslint-disable-next-line import/prefer-default-export
export const commentsReducer = combineReducers({
    byId: commentsByIdReducer,
});
