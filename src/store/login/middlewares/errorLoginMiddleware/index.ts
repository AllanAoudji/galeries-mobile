import { Middleware } from 'redux';

import { API_ERROR } from '#store/api';
import { dispatchErrorNotification } from '#store/dispatchers';
import { LOGIN } from '#store/genericActionTypes';
import { setLoading } from '#store/loading';
import { updateLoginFieldsError } from '#store/login';

const errorLoginMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${LOGIN} ${API_ERROR}`) {
            if (
                typeof action.payload === 'object' &&
                (typeof action.payload.password === 'string' ||
                    typeof action.payload.userNameOrEmail === 'string')
            )
                dispatch(updateLoginFieldsError(action.payload));
            else dispatchErrorNotification(dispatch, action);
            dispatch(setLoading(false));
        }
    };

export default errorLoginMiddleware;
