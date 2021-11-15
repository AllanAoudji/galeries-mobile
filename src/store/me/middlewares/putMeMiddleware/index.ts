import { Middleware } from 'redux';

import { dispatchPutUsersMeHasNewNotifications } from '#store/dispatchers';
import { ME_PUT } from '#store/me/actionTypes';

const putMeMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== ME_PUT) return;

        if (typeof action.payload !== 'object') return;

        if (action.payload.hasNewNotifications)
            dispatchPutUsersMeHasNewNotifications(dispatch);
    };

export default putMeMiddleware;
