import { Middleware } from 'redux';

import { LOGIN_RESET } from '#store/login/actionTypes';
import {
    resetLoginFieldErrors,
    resetLoginStatus,
} from '#store/login/actionCreators';

const resetLoginMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === LOGIN_RESET) {
            dispatch(resetLoginFieldErrors());
            dispatch(resetLoginStatus());
        }
    };

export default resetLoginMiddleware;
