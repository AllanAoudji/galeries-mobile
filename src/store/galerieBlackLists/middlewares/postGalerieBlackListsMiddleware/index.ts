import { Middleware } from 'redux';

import { dispatchPostGalerieBlackList } from '#store/dispatchers';
import { updateGalerieBlackListsLoadingPost } from '#store/galerieBlackLists/actionCreators';
import { GALERIE_BLACKLISTS_POST } from '#store/galerieBlackLists/actionTypes';

const postGalerieBlackListsMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== GALERIE_BLACKLISTS_POST) return;

        const galerieId = action.meta.query
            ? action.meta.query.galerieId
            : undefined;
        if (!galerieId) return;
        const userId = action.meta.query ? action.meta.query.userId : undefined;
        if (!userId) return;
        const loading = getState().galerieBlackLists.loading.post;
        if (loading.includes('LOADING')) return;

        dispatch(updateGalerieBlackListsLoadingPost('LOADING'));
        dispatchPostGalerieBlackList(dispatch, galerieId, userId);
    };

export default postGalerieBlackListsMiddleware;
