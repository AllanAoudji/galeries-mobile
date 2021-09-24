import { combineReducers } from 'redux';

import comments from './comments.reducer';
import frames from './frames.reducer';
import galeriePictures from './galeriePictures.reducer';
import likes from './likes.reducer';
import profilePictures from './profilePicturesReducer';

export default combineReducers({
    comments,
    frames,
    galeriePictures,
    likes,
    profilePictures,
});
