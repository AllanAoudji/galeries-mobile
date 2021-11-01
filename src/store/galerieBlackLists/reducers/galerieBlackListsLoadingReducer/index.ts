import { combineReducers } from 'redux';

import galerieBlackListsLoadingDeleteReducer from './galerieBlackListsLoadingDeleteReducer';
import galerieBlackListsLoadingPostReducer from './galerieBlackListsLoadingPostReducer';

export default combineReducers({
    delete: galerieBlackListsLoadingDeleteReducer,
    post: galerieBlackListsLoadingPostReducer,
});
