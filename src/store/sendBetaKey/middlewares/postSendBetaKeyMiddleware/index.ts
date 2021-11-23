import { Middleware } from 'redux';

import { updateSendBetaKeyStatusId } from '#store/sendBetaKey/actionCreators';
import { SEND_BETA_KEY_POST } from '#store/sendBetaKey/actionTypes';
import { dispatchSendBetaKey } from '#store/dispatchers';

const postSendBetaKeyMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== SEND_BETA_KEY_POST) return;

        const betaKeyId = action.meta.query
            ? action.meta.query.betaKeyId
            : undefined;
        if (!betaKeyId) return;
        const status = getState().sendBetaKey.status.id[betaKeyId] || 'PENDING';
        if (status.includes('LOADING')) return;

        dispatch(updateSendBetaKeyStatusId('LOADING', betaKeyId));
        dispatchSendBetaKey(dispatch, betaKeyId);
    };

export default postSendBetaKeyMiddleware;
