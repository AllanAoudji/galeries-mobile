import { combineReducers } from 'redux';

import galerieBlackListsAllIdsReducer from './galerieBlackListsAllIdsReducer';
import galerieBlackListsByIdReducer from './galerieBlackListsByIdReducer';
import galerieBlackListsCurrentReducer from './galerieBlackListsCurrentReducer';
import galerieBlackListsEndReduer from './galerieBlackListsEndReduer';
import galerieBlackListsLoadingReducer from './galerieBlackListsLoadingReducer';
import galerieBlackListsPreviousReducer from './galerieBlackListsPreviousReducer';
import galerieBlackListsStatusReducer from './galerieBlackListsStatusReducer';

// eslint-disable-next-line import/prefer-default-export
export const galerieBlackListsReducer = combineReducers({
    allIds: galerieBlackListsAllIdsReducer,
    byId: galerieBlackListsByIdReducer,
    current: galerieBlackListsCurrentReducer,
    end: galerieBlackListsEndReduer,
    loading: galerieBlackListsLoadingReducer,
    previous: galerieBlackListsPreviousReducer,
    status: galerieBlackListsStatusReducer,
});
