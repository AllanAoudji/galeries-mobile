import { combineReducers } from 'redux';

import UIStates from './UIState.reducer';
import frames from './frames.reducer';
import galeries from './galeries.reducer';
import galeriePictures from './galeriePictures.reducer';
import me from './me.reducer';
import notification from './notification.reducer';
import users from './users.reducer';

export default combineReducers({
    UIStates,
    frames,
    galeries,
    galeriePictures,
    me,
    notification,
    users,
});
