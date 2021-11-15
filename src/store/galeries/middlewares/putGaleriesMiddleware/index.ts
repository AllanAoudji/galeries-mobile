import { Middleware } from 'redux';

import {
    dispatchPutGalerie,
    dispatchPutGalerieAllowNotification,
    dispatchPutGalerieHasNewFrames,
} from '#store/dispatchers';
import { updateGaleriesLoadingPut } from '#store/galeries/actionCreators';
import { GALERIES_PUT } from '#store/galeries/actionTypes';

const putGaleriesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== GALERIES_PUT) return;
        const galerieId = action.meta.query
            ? action.meta.query.galerieId
            : undefined;
        if (!galerieId) return;
        const loading = getState().galeries.loading.put;
        if (loading.includes('LOADING')) return;

        if (typeof action.payload !== 'object') return;

        if (action.payload.hasNewFrames)
            dispatchPutGalerieHasNewFrames(dispatch, galerieId);
        else if (
            typeof action.payload.description === 'string' &&
            typeof action.payload.name === 'string'
        ) {
            dispatch(updateGaleriesLoadingPut('LOADING'));
            dispatchPutGalerie(dispatch, galerieId, action.payload);
        } else if (Object.keys(action.payload).length === 0) {
            dispatch(updateGaleriesLoadingPut('LOADING'));
            dispatchPutGalerieAllowNotification(dispatch, galerieId);
        }
    };

export default putGaleriesMiddleware;
