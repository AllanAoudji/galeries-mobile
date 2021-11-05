import { Middleware } from 'redux';

import {
    resetGalerieBlackListsAllIds,
    resetGalerieBlackListsCurrent,
    resetGalerieBlackListsEnd,
    resetGalerieBlackListsLoadingDelete,
    resetGalerieBlackListsLoadingPost,
    resetGalerieBlackListsPrevious,
} from '#store/galerieBlackLists/actionCreators';
import { GALERIE_BLACKLISTS_RESET } from '#store/galerieBlackLists/actionTypes';

const resetGalerieBlackListsMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== GALERIE_BLACKLISTS_RESET) return;

        dispatch(resetGalerieBlackListsAllIds());
        dispatch(resetGalerieBlackListsCurrent());
        dispatch(resetGalerieBlackListsEnd());
        dispatch(resetGalerieBlackListsLoadingDelete());
        dispatch(resetGalerieBlackListsLoadingPost());
        dispatch(resetGalerieBlackListsPrevious());
    };

export default resetGalerieBlackListsMiddleware;
