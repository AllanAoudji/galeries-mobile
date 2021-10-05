import { Middleware } from 'redux';

import { dispatchDeleteGalerie } from '#store/dispatchers';
import { updateGaleriesLoadingDelete } from '#store/galeries/actionCreators';
import { GALERIES_DELETE } from '#store/galeries/actionTypes';

const deleteGaleriesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== GALERIES_DELETE) return;
        const loading = getState().galeries.loading.delete;
        if (typeof action.payload !== 'string' || loading.includes('LOADING'))
            return;

        dispatch(updateGaleriesLoadingDelete('LOADING'));
        dispatchDeleteGalerie(dispatch, action.payload);
    };

export default deleteGaleriesMiddleware;
