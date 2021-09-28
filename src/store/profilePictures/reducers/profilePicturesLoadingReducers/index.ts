import { combineReducers } from 'redux';
import profilePicturesLoadingDeleteReducer from './profilePicturesLoadingDeleteReducer';
import profilePicturesLoadingPostReducer from './profilePicturesLoadingPostReducer';

const profilepicturesLoadingReducer = combineReducers({
    delete: profilePicturesLoadingDeleteReducer,
    post: profilePicturesLoadingPostReducer,
});

export default profilepicturesLoadingReducer;
