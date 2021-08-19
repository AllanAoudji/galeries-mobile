import { combineReducers } from 'redux';

import galeries from './galeries.reducer';
import notification from './notification.reducer';
import user from './user.reducer';

export default combineReducers({
    galeries,
    notification,
    user,
});
