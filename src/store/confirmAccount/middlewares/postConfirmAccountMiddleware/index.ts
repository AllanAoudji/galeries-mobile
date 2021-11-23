import { Middleware } from 'redux';

import { CONFIRM_ACCOUNT_POST } from '#store/confirmAccount/actionTypes';
import { dispatchPostUsersConfirmation } from '#store/dispatchers';
import { updateConfirmAccountState } from '#store/confirmAccount/actionCreators';

const postConfirmAccountMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== CONFIRM_ACCOUNT_POST) return;
        if (typeof action.payload !== 'object') return;
        if (typeof action.payload.email !== 'string') return;
        const { status } = getState().confirmAccount;
        if (status.includes('LOADING')) return;

        dispatch(updateConfirmAccountState('LOADING'));
        dispatchPostUsersConfirmation(dispatch, action.payload);
    };

export default postConfirmAccountMiddleware;
