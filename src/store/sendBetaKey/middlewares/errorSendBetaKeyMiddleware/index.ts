import { Middleware } from 'redux';

import { updateSendBetaKeyStatusId } from '#store/sendBetaKey/actionCreators';
import { API_ERROR } from '#store/api';
import { dispatchErrorNotification } from '#store/dispatchers';
import { SEND_BETA_KEY } from '#store/genericActionTypes';

const errorSendBetaKeyMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== `${SEND_BETA_KEY} ${API_ERROR}`) return;
        const betaKeyId = action.meta.query
            ? action.meta.query.betaKeyId
            : undefined;

        dispatchErrorNotification(dispatch, action);
        if (betaKeyId) dispatch(updateSendBetaKeyStatusId('ERROR', betaKeyId));
    };

export default errorSendBetaKeyMiddleware;
