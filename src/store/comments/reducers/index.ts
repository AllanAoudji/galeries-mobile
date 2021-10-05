import { combineReducers } from 'redux';

import commentsAllIdsReducer from './commentsAllIdsReducer';
import commentsByIdReducer from './commentsByIdReducer';
import commentsCurrentReducer from './commentsCurrentReducer';
import commentsEndReducer from './commentsEndReducer';
import commentsLoadingReducers from './commentsLoadingReducers';
import commentsPreviousReducer from './commentsPreviousReducer';
import commentsStatusReducer from './commentsStatusReducer';

// eslint-disable-next-line import/prefer-default-export
export const commentsReducer = combineReducers({
    allIds: commentsAllIdsReducer,
    byId: commentsByIdReducer,
    current: commentsCurrentReducer,
    end: commentsEndReducer,
    loading: commentsLoadingReducers,
    previous: commentsPreviousReducer,
    status: commentsStatusReducer,
});
