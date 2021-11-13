import { Middleware } from 'redux';

import { dispatchRefreshNotifications } from '#store/dispatchers';
import { updateNotificationsStatus } from '#store/notifications/actionCreators';
import { NOTIFICATIONS_REFETCH } from '#store/notifications/actionTypes';

const refreshNotificationsMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== NOTIFICATIONS_REFETCH) return;

        const status = getState().notifications.status || 'PENDING';
        if (status.includes('LOADING')) return;
        if (status === 'REFRESH') return;

        dispatch(updateNotificationsStatus('REFRESH'));
        dispatchRefreshNotifications(dispatch);
    };

export default refreshNotificationsMiddleware;
