import { Middleware } from 'redux';

import { dispatchPostGalerie } from '#store/dispatchers';
import { GALERIES_POST, updateGaleriesLoadingPost } from '#store/galeries';

const postGaleriesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === GALERIES_POST) {
            if (
                typeof action.payload === 'object' &&
                typeof action.payload.description === 'string' &&
                typeof action.payload.name === 'string'
            ) {
                dispatch(updateGaleriesLoadingPost('LOADING'));
                dispatchPostGalerie(dispatch, action.payload);
            }
        }
    };

export default postGaleriesMiddleware;
