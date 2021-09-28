import { Middleware } from 'redux';

import { dispatchPutGalerie } from '#store/dispatchers';
import { GALERIES_PUT, updateGaleriesLoadingPut } from '#store/galeries';

const putGaleriesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === GALERIES_PUT) {
            const galerieId = action.meta.query
                ? action.meta.query.galerieId
                : undefined;
            if (
                galerieId &&
                typeof action.payload === 'object' &&
                typeof action.payload.description === 'string' &&
                typeof action.payload.name === 'string'
            ) {
                dispatch(updateGaleriesLoadingPut('LOADING'));
                dispatchPutGalerie(dispatch, galerieId, action.payload);
            }
        }
    };

export default putGaleriesMiddleware;
