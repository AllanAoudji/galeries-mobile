import { combineReducers } from 'redux';

import galeriesLoadingDeleteReducer from './galeriesLoadingDeleteReducer';
import galeriesLoadingPostReducer from './galeriesLoadingPostReducer';
import galeriesLoadingPutReducer from './galeriesLoadingPutReducer';

export default combineReducers({
    delete: galeriesLoadingDeleteReducer,
    post: galeriesLoadingPostReducer,
    put: galeriesLoadingPutReducer,
});
