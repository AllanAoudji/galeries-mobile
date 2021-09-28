import { Middleware } from 'redux';

import { dispatchPostGalerie } from '#store/dispatchers';
import { GALERIES_POST, updateGaleriesLoadingPost } from '#store/galeries';
import { getGaleriesLoadingPost } from '#store/getters';

const postGaleriesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === GALERIES_POST) {
            const loading = getGaleriesLoadingPost(getState);
            if (
                typeof action.payload === 'object' &&
                typeof action.payload.description === 'string' &&
                typeof action.payload.name === 'string' &&
                !loading.includes('LOADING')
            ) {
                dispatch(updateGaleriesLoadingPost('LOADING'));
                dispatchPostGalerie(dispatch, action.payload);
            }
        }
    };

export default postGaleriesMiddleware;
