import { combineReducers } from 'redux';

import galeriesLoadingPostReducer from './galeriesLoadingPostReducer';

export default combineReducers({
    post: galeriesLoadingPostReducer,
});
