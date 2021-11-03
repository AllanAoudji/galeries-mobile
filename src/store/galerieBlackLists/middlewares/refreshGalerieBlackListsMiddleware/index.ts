import { Middleware } from 'redux';

import { dispatchRefreshGalerieBlackLists } from '#store/dispatchers';
import { updateGalerieBlackListsStatus } from '#store/galerieBlackLists/actionCreators';
import { GALERIE_BLACKLISTS_REFRESH } from '#store/galerieBlackLists/actionTypes';

const refreshGalerieBlackListsMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== GALERIE_BLACKLISTS_REFRESH) return;

        const galerieId = action.meta.query
            ? action.meta.query.galerieId
            : undefined;

        if (galerieId) {
            const status =
                getState().galerieBlackLists.status[galerieId] || 'PENDING';
            if (status.includes('LOADING')) return;
            if (status === 'REFRESH') return;

            dispatch(updateGalerieBlackListsStatus(galerieId, 'REFRESH'));
            dispatchRefreshGalerieBlackLists(dispatch, galerieId);
        }
    };

export default refreshGalerieBlackListsMiddleware;
