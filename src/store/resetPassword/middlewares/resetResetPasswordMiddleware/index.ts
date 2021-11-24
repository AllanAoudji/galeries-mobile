import { Middleware } from 'redux';

import {
    resetResetPasswordCurrent,
    resetResetPasswordFieldErrors,
    resetResetPasswordStatus,
} from '#store/resetPassword/actionCreators';
import { RESET_PASSWORD_RESET } from '#store/resetPassword/actionTypes';

const resetResetPasswordMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== RESET_PASSWORD_RESET) return;

        dispatch(resetResetPasswordCurrent());
        dispatch(resetResetPasswordFieldErrors());
        dispatch(resetResetPasswordStatus());
    };

export default resetResetPasswordMiddleware;
