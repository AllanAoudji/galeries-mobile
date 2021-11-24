import { Middleware } from 'redux';

import {
    updateResetPasswordCurrent,
    updateResetPasswordStatus,
} from '#store/resetPassword/actionCreators';
import { RESET_PASSWORD_POST } from '#store/resetPassword/actionTypes';
import { dispatchPostResetPassword } from '#store/dispatchers';

const postResetPasswordMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== RESET_PASSWORD_POST) return;
        if (typeof action.payload !== 'object') return;
        if (typeof action.payload.email !== 'string') return;
        const { status } = getState().resetPassword;
        if (status.includes('LOADING')) return;

        dispatch(updateResetPasswordCurrent(action.payload.email));
        dispatch(updateResetPasswordStatus('LOADING'));
        dispatchPostResetPassword(dispatch, action.payload);
    };

export default postResetPasswordMiddleware;
