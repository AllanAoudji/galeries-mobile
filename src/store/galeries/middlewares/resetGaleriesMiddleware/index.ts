import { Middleware } from 'redux';

import {
    resetGaleriesAllIds,
    resetGaleriesById,
    resetGaleriesCurrent,
    resetGaleriesEnd,
    resetGaleriesFieldsError,
    resetGaleriesFilterName,
    resetGaleriesLoadingDelete,
    resetGaleriesLoadingPost,
    resetGaleriesLoadingPut,
    resetGaleriesPrevious,
    resetGaleriesStatusId,
    resetGaleriesStatusName,
} from '#store/galeries/actionCreators';
import { GALERIES_RESET } from '#store/galeries/actionTypes';

const resetGaleriesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === GALERIES_RESET) {
            dispatch(resetGaleriesAllIds());
            dispatch(resetGaleriesById());
            dispatch(resetGaleriesCurrent());
            dispatch(resetGaleriesEnd());
            dispatch(resetGaleriesFieldsError());
            dispatch(resetGaleriesFilterName());
            dispatch(resetGaleriesLoadingDelete());
            dispatch(resetGaleriesLoadingPost());
            dispatch(resetGaleriesLoadingPut());
            dispatch(resetGaleriesPrevious());
            dispatch(resetGaleriesStatusId());
            dispatch(resetGaleriesStatusName());
        }
    };

export default resetGaleriesMiddleware;
