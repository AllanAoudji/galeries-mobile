import { combineReducers } from 'redux';

import reportsLoadingPostReducer from './reportsLoadingPostReducer';

export default combineReducers({
    post: reportsLoadingPostReducer,
});
