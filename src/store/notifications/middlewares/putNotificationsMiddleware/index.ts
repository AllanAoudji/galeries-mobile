import { Middleware } from 'redux';

import { dispatchPutNotification } from '#store/dispatchers';
import { NOTIFICATIONS_PUT } from '#store/notifications/actionTypes';

const putNotificationsMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== NOTIFICATIONS_PUT) return;
        if (typeof action.payload !== 'string') return;

        dispatchPutNotification(dispatch, action.payload);
    };

export default putNotificationsMiddleware;
