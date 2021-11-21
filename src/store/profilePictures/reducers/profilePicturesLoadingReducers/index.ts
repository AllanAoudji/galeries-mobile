import { combineReducers } from 'redux';

import profilePicturesLoadingDeleteReducer from './profilePicturesLoadingDeleteReducer';
import profilePicturesLoadingPostReducer from './profilePicturesLoadingPostReducer';
import profilePicturesLoadingPutReducer from './profilePicturesLoadingPutReducer';

const profilepicturesLoadingReducer = combineReducers({
    delete: profilePicturesLoadingDeleteReducer,
    post: profilePicturesLoadingPostReducer,
    put: profilePicturesLoadingPutReducer,
});

export default profilepicturesLoadingReducer;
