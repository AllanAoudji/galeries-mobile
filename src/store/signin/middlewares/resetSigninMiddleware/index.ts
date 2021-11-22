import { Middleware } from 'redux';

import {
    resetSigninFieldsError,
    resetSigninStatus,
} from '#store/signin/actionCreators';
import { SIGNIN_RESET } from '#store/signin/actionTypes';

const resetSigninMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type !== SIGNIN_RESET) return;
        dispatch(resetSigninFieldsError());
        dispatch(resetSigninStatus());
    };

export default resetSigninMiddleware;
