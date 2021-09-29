import { combineReducers } from 'redux';

import profilePicturesAllIdsReducer from './profilePicturesAllIdsReducer';
import profilePicturesByIdReducer from './profilePicturesByIdReducer';
import profilePicturesCurrentReducer from './profilePicturesCurrentReducer';
import profilepicturesLoadingReducer from './profilePicturesLoadingReducers';
import profilePicturesPreviousReducer from './profilePicturesPreviousInitialState';
import profilePicturesStatusReducer from './profilePicturesStatusReducer';

// eslint-disable-next-line import/prefer-default-export
export const profilePicturesReducer = combineReducers({
    allIds: profilePicturesAllIdsReducer,
    byId: profilePicturesByIdReducer,
    current: profilePicturesCurrentReducer,
    loading: profilepicturesLoadingReducer,
    previous: profilePicturesPreviousReducer,
    status: profilePicturesStatusReducer,
});
