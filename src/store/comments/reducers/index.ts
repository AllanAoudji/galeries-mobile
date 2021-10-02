import { combineReducers } from 'redux';

import commentsByIdReducer from './commentsByIdReducer';
import commentsCurrentReducer from './commentsCurrentReducer';
import commentsLoadingReducers from './commentsLoadingReducers';

// eslint-disable-next-line import/prefer-default-export
export const commentsReducer = combineReducers({
    byId: commentsByIdReducer,
    current: commentsCurrentReducer,
    loading: commentsLoadingReducers,
});
