import { Middleware } from 'redux';

import { API_SUCCESS } from '#store/api/actionTypes';
import { CONFIRM_ACCOUNT } from '#store/genericActionTypes';
import { updateNotification } from '#store/notification/actionCreators';
import { updateConfirmAccountState } from '#store/confirmAccount/actionCreators';

const successConfirmAccountMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== `${CONFIRM_ACCOUNT} ${API_SUCCESS}`) return;

        dispatch(updateConfirmAccountState('SUCCESS'));
        dispatch(
            updateNotification({
                status: 'success',
                text: 'an email as been send to you',
            })
        );
    };

export default successConfirmAccountMiddleware;
