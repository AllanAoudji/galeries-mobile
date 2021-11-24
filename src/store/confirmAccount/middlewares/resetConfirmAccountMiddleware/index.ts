import { Middleware } from 'redux';

import { CONFIRM_ACCOUNT_RESET } from '#store/confirmAccount/actionTypes';
import { resetConfirmAccountState } from '#store/confirmAccount/actionCreators';

const resetConfirmAccountMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type !== CONFIRM_ACCOUNT_RESET) return;

        dispatch(resetConfirmAccountState());
    };

export default resetConfirmAccountMiddleware;
