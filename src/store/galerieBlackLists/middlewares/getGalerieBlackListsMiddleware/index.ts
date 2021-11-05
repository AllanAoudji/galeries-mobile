import { Middleware } from 'redux';

import {
    dispatchGetGalerieBlackList,
    dispatchGetGalerieBlackLists,
} from '#store/dispatchers';
import { updateGalerieBlackListsStatus } from '#store/galerieBlackLists/actionCreators';
import { GALERIE_BLACKLISTS_GET } from '#store/galerieBlackLists/actionTypes';

const getGalerieBlackListsMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== GALERIE_BLACKLISTS_GET) return;

        const galerieId = action.meta.query
            ? action.meta.query.galerieId
            : undefined;
        if (!galerieId) return;
        const galerieBlackListId = action.meta.query
            ? action.meta.query.galerieBlackListId
            : undefined;

        if (galerieBlackListId)
            dispatchGetGalerieBlackList(
                dispatch,
                galerieId,
                galerieBlackListId
            );
        else {
            const end = getState().galerieBlackLists.end[galerieId] || false;
            if (end) return;
            const status =
                getState().galerieBlackLists.status[galerieId] || 'PENDING';
            if (status.includes('LOADING')) return;
            if (status === 'REFRESH') return;

            const newStatus: Store.Status =
                status === 'PENDING' ? 'INITIAL_LOADING' : 'LOADING';
            const previous = getState().galerieBlackLists.previous[galerieId];

            dispatch(updateGalerieBlackListsStatus(galerieId, newStatus));
            dispatchGetGalerieBlackLists(dispatch, galerieId, previous);
        }
    };

export default getGalerieBlackListsMiddleware;
