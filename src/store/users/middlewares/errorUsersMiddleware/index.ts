import { Middleware } from 'redux';

import { API_ERROR } from '#store/api/actionTypes';
import { dispatchErrorNotification } from '#store/dispatchers';
import { USERS } from '#store/genericActionTypes';

const errorUsersMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== `${USERS} ${API_ERROR}`) return;

        dispatchErrorNotification(dispatch, action);
    };

export default errorUsersMiddleware;
