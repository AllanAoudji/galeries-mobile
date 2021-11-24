import { Middleware } from 'redux';

import {
    dispatchDeleteGalerie,
    dispatchUnsubscribeGalerie,
} from '#store/dispatchers';
import { updateGaleriesLoadingDelete } from '#store/galeries/actionCreators';
import { GALERIES_DELETE } from '#store/galeries/actionTypes';

const deleteGaleriesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== GALERIES_DELETE) return;
        const galerieId = action.meta.query
            ? action.meta.query.galerieId
            : undefined;
        if (!galerieId) return;
        const galerie = getState().galeries.byId[galerieId];
        if (!galerie) return;

        const loading = getState().galeries.loading.delete;
        if (loading.includes('LOADING')) return;

        if (galerie.role === 'admin') {
            if (
                typeof action.payload !== 'object' ||
                typeof action.payload.password !== 'string' ||
                typeof action.payload.name !== 'string'
            )
                return;
            dispatch(updateGaleriesLoadingDelete('LOADING'));
            dispatchDeleteGalerie(dispatch, galerieId, action.payload);
        } else {
            dispatch(updateGaleriesLoadingDelete('LOADING'));
            dispatchUnsubscribeGalerie(dispatch, galerieId);
        }
    };

export default deleteGaleriesMiddleware;
