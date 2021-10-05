import { Middleware } from 'redux';

import { dispatchPostGalerie } from '#store/dispatchers';
import { GALERIES_POST } from '#store/galeries/actionTypes';
import { updateGaleriesLoadingPost } from '#store/galeries/actionCreators';

const postGaleriesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === GALERIES_POST) {
            const loading = getState().galeries.loading.post;
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
