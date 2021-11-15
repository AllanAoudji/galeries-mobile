import { Middleware } from 'redux';

import { dispatchDeleteNotification } from '#store/dispatchers';
import { updateNotificationsLoadingDelete } from '#store/notifications/actionCreators';
import { NOTIFICATIONS_DELETE } from '#store/notifications/actionTypes';

const deleteNotificationsMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== NOTIFICATIONS_DELETE) return;

        const loading = getState().notifications.loading.delete;
        if (typeof action.payload !== 'string') return;
        if (loading.includes('LOADING')) return;

        dispatch(updateNotificationsLoadingDelete('LOADING'));
        dispatchDeleteNotification(dispatch, action.payload);
    };

export default deleteNotificationsMiddleware;
