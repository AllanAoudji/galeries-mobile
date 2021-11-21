import { combineReducers } from 'redux';

import betaKeysAllIdsReducer from './betaKeysAllIdsReducer';
import betaKeysByIdReducer from './betaKeysByIdReducer';
import betaKeysCurrentReducer from './betaKeysCurrentReducer';
import betaKeysEndReducer from './betaKeysEndReducer';
import betaKeysLoadingReducer from './betaKeysLoadingReducer';
import betaKeysPreviousReducer from './betaKeysPreviousReducer';
import betaKeysStatusReducer from './betaKeysStatusReducer';

// eslint-disable-next-line import/prefer-default-export
export const betaKeysReducer = combineReducers({
    allIds: betaKeysAllIdsReducer,
    byId: betaKeysByIdReducer,
    current: betaKeysCurrentReducer,
    end: betaKeysEndReducer,
    loading: betaKeysLoadingReducer,
    previous: betaKeysPreviousReducer,
    status: betaKeysStatusReducer,
});
