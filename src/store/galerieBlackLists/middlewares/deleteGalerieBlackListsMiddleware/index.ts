import { Middleware } from 'redux';

import { dispatchDeleteGalerieBlackList } from '#store/dispatchers';
import { updateGalerieBlackListsLoadingDelete } from '#store/galerieBlackLists/actionCreators';
import { GALERIE_BLACKLISTS_DELETE } from '#store/galerieBlackLists/actionTypes';

const deleteGalerieBlackListsMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== GALERIE_BLACKLISTS_DELETE) return;
        const loading = getState().galerieBlackLists.loading.delete;
        if (loading.includes('LOADING')) return;

        const galerieId = action.meta.query
            ? action.meta.query.galerieId
            : undefined;
        if (!galerieId) return;
        const galerieBlackListId = action.meta.query
            ? action.meta.query.galerieBlackListId
            : undefined;
        if (!galerieBlackListId) return;

        dispatch(updateGalerieBlackListsLoadingDelete('LOADING'));
        dispatchDeleteGalerieBlackList(dispatch, galerieId, galerieBlackListId);
    };

export default deleteGalerieBlackListsMiddleware;
