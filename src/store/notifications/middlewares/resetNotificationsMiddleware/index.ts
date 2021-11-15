import { Middleware } from 'redux';

import {
    resetNotificationsAllIds,
    resetNotificationsById,
    resetNotificationsEnd,
    resetNotificationsLoadingDelete,
    resetNotificationsPrevious,
    resetNotificationsStatus,
} from '#store/notifications/actionCreators';
import { NOTIFICATIONS_RESET } from '#store/notifications/actionTypes';

const resetNotificationsMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== NOTIFICATIONS_RESET) return;

        dispatch(resetNotificationsAllIds());
        dispatch(resetNotificationsById());
        dispatch(resetNotificationsEnd());
        dispatch(resetNotificationsLoadingDelete());
        dispatch(resetNotificationsPrevious());
        dispatch(resetNotificationsStatus());
    };

export default resetNotificationsMiddleware;
