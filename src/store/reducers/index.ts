import { combineReducers } from 'redux';

import frames from './frames.reducer';
import filters from './filters.reducer';
import galeries from './galeries.reducer';
import notification from './notification.reducer';
import user from './user.reducer';

export default combineReducers({
    filters,
    frames,
    galeries,
    notification,
    user,
});
