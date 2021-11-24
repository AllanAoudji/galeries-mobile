import { Middleware } from 'redux';

import { API_ERROR } from '#store/api/actionTypes';
import { dispatchErrorNotification } from '#store/dispatchers';
import { RESET_PASSWORD } from '#store/genericActionTypes';
import {
    updateResetPasswordFieldErrors,
    updateResetPasswordStatus,
} from '#store/resetPassword/actionCreators';

const errorResetPasswordMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type !== `${RESET_PASSWORD} ${API_ERROR}`) return;
        if (
            typeof action.payload === 'object' &&
            typeof action.payload.email === 'string'
        )
            dispatch(updateResetPasswordFieldErrors(action.payload));
        else dispatchErrorNotification(dispatch, action);
        dispatch(updateResetPasswordStatus('ERROR'));
    };

export default errorResetPasswordMiddleware;
