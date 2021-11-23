import { Middleware } from 'redux';

import { API_SUCCESS } from '#store/api/actionTypes';
import { RESET_PASSWORD } from '#store/genericActionTypes';
import { updateNotification } from '#store/notification/actionCreators';
import { updateResetPasswordStatus } from '#store/resetPassword/actionCreators';

const successResetPasswordMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== `${RESET_PASSWORD} ${API_SUCCESS}`) return;

        dispatch(updateResetPasswordStatus('SUCCESS'));
        dispatch(
            updateNotification({
                status: 'success',
                text: 'an email as been send to you',
            })
        );
    };

export default successResetPasswordMiddleware;
