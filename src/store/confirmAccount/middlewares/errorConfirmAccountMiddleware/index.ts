import { Middleware } from 'redux';

import { updateConfirmAccountState } from '#store/confirmAccount/actionCreators';
import { API_ERROR } from '#store/api/actionTypes';
import { dispatchErrorNotification } from '#store/dispatchers';
import { CONFIRM_ACCOUNT } from '#store/genericActionTypes';

const errorConfirmAccountMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== `${CONFIRM_ACCOUNT} ${API_ERROR}`) return;

        dispatchErrorNotification(dispatch, action);
        dispatch(updateConfirmAccountState('ERROR'));
    };

export default errorConfirmAccountMiddleware;
