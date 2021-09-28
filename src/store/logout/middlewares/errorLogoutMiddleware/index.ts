import { Middleware } from 'redux';

import { API_ERROR } from '#store/api';
import { dispatchErrorNotification } from '#store/dispatchers';
import { LOGOUT } from '#store/genericActionTypes';

const errorLogoutMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${LOGOUT} ${API_ERROR}`)
            dispatchErrorNotification(dispatch, action);
    };

export default errorLogoutMiddleware;
