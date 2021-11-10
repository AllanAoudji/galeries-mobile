import { Middleware } from 'redux';

import { API_ERROR } from '#store/api/actionTypes';
import { dispatchErrorNotification } from '#store/dispatchers';
import { LOGIN } from '#store/genericActionTypes';
import {
    updateLoginFieldsError,
    updateLoginStatus,
} from '#store/login/actionCreators';

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
            ) {
                dispatch(updateLoginFieldsError(action.payload));
            } else dispatchErrorNotification(dispatch, action);
            dispatch(updateLoginStatus('ERROR'));
        }
    };

export default errorLoginMiddleware;
