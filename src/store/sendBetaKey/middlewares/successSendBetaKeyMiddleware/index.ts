import { Middleware } from 'redux';

import { API_SUCCESS } from '#store/api/actionTypes';
import { SEND_BETA_KEY } from '#store/genericActionTypes';
import { updateNotification } from '#store/notification/actionCreators';
import { updateSendBetaKeyStatusId } from '#store/sendBetaKey/actionCreators';

const successSendBetaKeyMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== `${SEND_BETA_KEY} ${API_SUCCESS}`) return;
        const betaKeyId = action.meta.query
            ? action.meta.query.betaKeyId
            : undefined;
        if (!betaKeyId) return;

        dispatch(updateSendBetaKeyStatusId('SUCCESS', betaKeyId));
        dispatch(
            updateNotification({
                status: 'success',
                text: 'an email as been send to you',
            })
        );
    };

export default successSendBetaKeyMiddleware;
