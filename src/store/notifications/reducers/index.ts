import { combineReducers } from 'redux';

import notificationsAllIdsReducer from './notificationsAllIdsReducer';
import notificationsByIdReducer from './notificationsByIdReducer';
import notificationsCurrentReducer from './notificationsCurrentReducer';
import notificationsEndReducer from './notificationsEndReducer';
import notificationsLoadingReducer from './notificationsLoadingReducer';
import notificationsPreviousReducer from './notificationsPreviousReducer';
import notificationsStatusReducer from './notificationsStatusReducer';

// eslint-disable-next-line import/prefer-default-export
export const notificationsReducer = combineReducers({
    allIds: notificationsAllIdsReducer,
    byId: notificationsByIdReducer,
    current: notificationsCurrentReducer,
    end: notificationsEndReducer,
    loading: notificationsLoadingReducer,
    previous: notificationsPreviousReducer,
    status: notificationsStatusReducer,
});
