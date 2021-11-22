import { Middleware } from 'redux';

import { dispatchRefreshBetaKeys } from '#store/dispatchers';
import { updateBetaKeysStatus } from '#store/betaKeys/actionCreators';
import { BETA_KEYS_REFRESH } from '#store/betaKeys/actionTypes';

const refreshBetaKeysMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== BETA_KEYS_REFRESH) return;

        const { status } = getState().betaKeys;
        if (status.includes('LOADING')) return;
        if (status === 'REFRESH') return;

        dispatch(updateBetaKeysStatus('REFRESH'));
        dispatchRefreshBetaKeys(dispatch);
    };

export default refreshBetaKeysMiddleware;
