import { combineReducers } from 'redux';
import commentsLoadingDeleteReducer from './commentsLoadingDeleteReducer';
import commentsLoadingPostReducer from './commentsLoadingPostReducer';

const commentsLoadingReducers = combineReducers({
    delete: commentsLoadingDeleteReducer,
    post: commentsLoadingPostReducer,
});

export default commentsLoadingReducers;
