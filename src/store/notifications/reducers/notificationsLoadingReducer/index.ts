import { combineReducers } from 'redux';

import notificationsLoadingDeleteReducer from './notificationsLoadingDeleteReducer';

export default combineReducers({
    delete: notificationsLoadingDeleteReducer,
});
