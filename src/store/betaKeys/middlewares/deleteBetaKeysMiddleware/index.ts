import { Middleware } from 'redux';

import { dispatchDeleteBetaKeys } from '#store/dispatchers';
import { updateBetaKeysLoadingDelete } from '#store/betaKeys/actionCreators';
import { BETA_KEYS_DELETE } from '#store/betaKeys/actionTypes';

const deleteBetaKeysMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== BETA_KEYS_DELETE) return;

        if (typeof action.payload !== 'string') return;
        const loading = getState().betaKeys.loading.delete;
        if (loading.includes('LOADING')) return;

        dispatch(updateBetaKeysLoadingDelete('LOADING'));
        dispatchDeleteBetaKeys(dispatch, action.payload);
    };

export default deleteBetaKeysMiddleware;
