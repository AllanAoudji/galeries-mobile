import { Middleware } from 'redux';

import {
    dispatchPostGalerie,
    dispatchPostGalerieSubscribe,
} from '#store/dispatchers';
import { updateGaleriesLoadingPost } from '#store/galeries/actionCreators';
import { GALERIES_POST } from '#store/galeries/actionTypes';

const postGaleriesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === GALERIES_POST) {
            const loading = getState().galeries.loading.post;

            if (loading.includes('LOADING')) return;
            if (typeof action.payload !== 'object') return;

            if (
                typeof action.payload.description === 'string' &&
                typeof action.payload.name === 'string'
            ) {
                dispatch(updateGaleriesLoadingPost('LOADING'));
                dispatchPostGalerie(dispatch, action.payload);
            } else if (typeof action.payload.code === 'string') {
                dispatch(updateGaleriesLoadingPost('LOADING'));
                dispatchPostGalerieSubscribe(dispatch, action.payload);
            }
        }
    };

export default postGaleriesMiddleware;
