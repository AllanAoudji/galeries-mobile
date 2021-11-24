import { combineReducers } from 'redux';

import betaKeysLoadingDeleteReducer from './betaKeysLoadingDeleteReducer';
import betaKeysLoadingPostReducer from './betaKeysLoadingPostReducer';

const betaKeysLoadingReducer = combineReducers({
    delete: betaKeysLoadingDeleteReducer,
    post: betaKeysLoadingPostReducer,
});

export default betaKeysLoadingReducer;
