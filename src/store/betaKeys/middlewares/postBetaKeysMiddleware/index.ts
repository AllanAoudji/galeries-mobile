import { Middleware } from 'redux';

import { dispatchPostBetaKey } from '#store/dispatchers';
import { updateBetaKeysLoadingPost } from '#store/betaKeys/actionCreators';
import { BETA_KEYS_POST } from '#store/betaKeys/actionTypes';

const postBetaKeysMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== BETA_KEYS_POST) return;

        const loading = getState().betaKeys.loading.post;
        if (loading.includes('LOADING')) return;
        if (typeof action.payload !== 'object') return;
        if (typeof action.payload.email !== 'string') return;

        dispatch(updateBetaKeysLoadingPost('LOADING'));
        dispatchPostBetaKey(dispatch, action.payload);
    };

export default postBetaKeysMiddleware;
