import { Middleware } from 'redux';

import {
    dispatchGetNotification,
    dispatchGetNotifications,
} from '#store/dispatchers';
import { updateNotificationsStatus } from '#store/notifications/actionCreators';
import { NOTIFICATIONS_GET } from '#store/notifications/actionTypes';

const getNotificationsMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== NOTIFICATIONS_GET) return;

        const notificationId = action.meta.query
            ? action.meta.query.notificationId
            : undefined;

        if (notificationId) dispatchGetNotification(dispatch, action.payload);
        else {
            const { end, previous, status } = getState().notifications;
            if (end) return;
            if (status && status.includes('LOADING')) return;
            if (status === 'REFRESH') return;

            const newStatus: Store.Status =
                status === 'PENDING' ? 'INITIAL_LOADING' : 'LOADING';
            dispatch(updateNotificationsStatus(newStatus));
            dispatchGetNotifications(dispatch, previous || '');
        }
    };

export default getNotificationsMiddleware;
