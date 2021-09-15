import { combineReducers } from 'redux';

import UIStates from './UIState.reducer';
import comments from './comments.reducer';
import frames from './frames.reducer';
import galeries from './galeries.reducer';
import galeriePictures from './galeriePictures.reducer';
import likes from './likes.reducer';
import me from './me.reducer';
import notification from './notification.reducer';
import users from './users.reducer';

export default combineReducers({
    UIStates,
    comments,
    frames,
    galeries,
    galeriePictures,
    likes,
    me,
    notification,
    users,
});
