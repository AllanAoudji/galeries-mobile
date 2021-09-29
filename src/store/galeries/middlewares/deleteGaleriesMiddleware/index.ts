import { Middleware } from 'redux';

import { dispatchDeleteGalerie } from '#store/dispatchers';
import { updateGaleriesLoadingDelete } from '#store/galeries/actionCreators';
import { GALERIES_DELETE } from '#store/galeries/actionTypes';
import { getGaleriesLoadingDelete } from '#store/getters';

const deleteGaleriesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === GALERIES_DELETE) {
            const loading = getGaleriesLoadingDelete(getState);
            if (
                typeof action.payload === 'string' &&
                !loading.includes('LOADING')
            ) {
                dispatch(updateGaleriesLoadingDelete('LOADING'));
                dispatchDeleteGalerie(dispatch, action.payload);
            }
        }
    };

export default deleteGaleriesMiddleware;
