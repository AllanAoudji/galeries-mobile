import { Middleware } from 'redux';

import { dispatchGetBetaKey, dispatchGetBetaKeys } from '#store/dispatchers';
import { updateBetaKeysStatus } from '#store/betaKeys/actionCreators';
import { BETA_KEYS_GET } from '#store/betaKeys/actionTypes';

const getBetaKeysMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== BETA_KEYS_GET) return;

        const betaKeyId = action.meta.query
            ? action.meta.query.betaKeyId
            : undefined;

        if (betaKeyId) dispatchGetBetaKey(dispatch, betaKeyId);
        else {
            const { end, previous, status } = getState().betaKeys;
            if (end) return;
            if (status && status.includes('LOADING')) return;
            if (status === 'REFRESH') return;

            const newStatus: Store.Status =
                status === 'PENDING' ? 'INITIAL_LOADING' : 'LOADING';
            dispatch(updateBetaKeysStatus(newStatus));
            dispatchGetBetaKeys(dispatch, previous);
        }
    };

export default getBetaKeysMiddleware;
