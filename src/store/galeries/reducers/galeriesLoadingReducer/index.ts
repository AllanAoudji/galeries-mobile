import { combineReducers } from 'redux';

import galeriesLoadingPostReducer from './galeriesLoadingPostReducer';
import galeriesLoadingPutReducer from './galeriesLoadingPutReducer';

export default combineReducers({
    post: galeriesLoadingPostReducer,
    put: galeriesLoadingPutReducer,
});
