import { Middleware } from 'redux';

import { dispatchDeleteGalerie } from '#store/dispatchers';
import { GALERIES_DELETE } from '#store/galeries';
import { updateFramesLoadingDelete } from '#store/frames';

const deleteGaleriesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === GALERIES_DELETE) {
            if (typeof action.payload === 'string') {
                dispatch(updateFramesLoadingDelete('ERROR'));
                dispatchDeleteGalerie(dispatch, action.payload);
            }
        }
    };

export default deleteGaleriesMiddleware;
