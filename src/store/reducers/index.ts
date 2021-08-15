import { combineReducers } from 'redux';

import notification from './notification.reducer';
import user from './user.reducer';

export default combineReducers({
    notification,
    user,
});
