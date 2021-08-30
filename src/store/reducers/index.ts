import { combineReducers } from 'redux';

import frames from './frames.reducer';
import galeries from './galeries.reducer';
import notification from './notification.reducer';
import UIStates from './UIState.reducer';
import user from './user.reducer';

export default combineReducers({
    frames,
    galeries,
    notification,
    UIStates,
    user,
});
