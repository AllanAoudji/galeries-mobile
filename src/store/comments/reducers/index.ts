import { combineReducers } from 'redux';

import commentsAllIdsReducer from './commentsAllIdsReducer';
import commentsByIdReducer from './commentsByIdReducer';
import commentsCurrentReducer from './commentsCurrentReducer';
import commentsLoadingReducers from './commentsLoadingReducers';
import commentsStatusReducer from './commentsStatusReducer';

// eslint-disable-next-line import/prefer-default-export
export const commentsReducer = combineReducers({
    allIds: commentsAllIdsReducer,
    byId: commentsByIdReducer,
    current: commentsCurrentReducer,
    loading: commentsLoadingReducers,
    status: commentsStatusReducer,
});
