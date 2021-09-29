import { combineReducers } from 'redux';

import likesByIdReducer from './likesByIdReducer';

// eslint-disable-next-line import/prefer-default-export
export const likesReducers = combineReducers({
    byId: likesByIdReducer,
});
