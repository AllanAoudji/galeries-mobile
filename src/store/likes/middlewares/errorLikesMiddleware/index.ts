import { Middleware } from 'redux';

import { API_ERROR } from '#store/api/actionTypes';
import { dispatchErrorNotification } from '#store/dispatchers';
import { LIKES } from '#store/genericActionTypes';

const errorLikesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== `${LIKES} ${API_ERROR}`) return;

        dispatchErrorNotification(dispatch, action);
    };

export default errorLikesMiddleware;
