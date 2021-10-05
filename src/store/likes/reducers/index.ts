import { combineReducers } from 'redux';

import likesByIdReducer from './likesByIdReducer';
import likesAllIdsReducer from './likesAllIdsReducer';
import likesEndReducer from './likesEndReducer';
import likesPreviousReducer from './likesPreviousReducer';
import likesStatusReducer from './likesStatusReducer';

// eslint-disable-next-line import/prefer-default-export
export const likesReducers = combineReducers({
    allIds: likesAllIdsReducer,
    byId: likesByIdReducer,
    end: likesEndReducer,
    previous: likesPreviousReducer,
    status: likesStatusReducer,
});
