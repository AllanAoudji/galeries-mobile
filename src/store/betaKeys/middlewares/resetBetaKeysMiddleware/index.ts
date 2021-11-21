import { Middleware } from 'redux';

import {
    resetBetaKeysAllIds,
    resetBetaKeysById,
    resetBetaKeysCurrent,
    resetBetaKeysEnd,
    resetBetaKeysLoadingDelete,
    resetBetaKeysLoadingPost,
    resetBetaKeysPrevious,
    resetBetaKeysStatus,
} from '#store/betaKeys/actionCreators';
import { BETA_KEYS_RESET } from '#store/betaKeys/actionTypes';

const resetBetaKeysMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== BETA_KEYS_RESET) return;

        dispatch(resetBetaKeysAllIds());
        dispatch(resetBetaKeysById());
        dispatch(resetBetaKeysCurrent());
        dispatch(resetBetaKeysEnd());
        dispatch(resetBetaKeysLoadingDelete());
        dispatch(resetBetaKeysLoadingPost());
        dispatch(resetBetaKeysPrevious());
        dispatch(resetBetaKeysStatus());
    };

export default resetBetaKeysMiddleware;
