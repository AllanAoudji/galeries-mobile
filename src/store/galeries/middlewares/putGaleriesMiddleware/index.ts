import { Middleware } from 'redux';

import { dispatchPutGalerie } from '#store/dispatchers';
import { GALERIES_PUT, updateGaleriesLoadingPut } from '#store/galeries';
import { getGaleriesLoadingPut } from '#store/getters';

const putGaleriesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === GALERIES_PUT) {
            const galerieId = action.meta.query
                ? action.meta.query.galerieId
                : undefined;
            const loading = getGaleriesLoadingPut(getState);
            if (
                typeof action.payload === 'object' &&
                typeof action.payload.description === 'string' &&
                typeof action.payload.name === 'string' &&
                galerieId &&
                !loading.includes('LOADING')
            ) {
                dispatch(updateGaleriesLoadingPut('LOADING'));
                dispatchPutGalerie(dispatch, galerieId, action.payload);
            }
        }
    };

export default putGaleriesMiddleware;
