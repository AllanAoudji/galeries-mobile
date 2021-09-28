import { Middleware } from 'redux';

import {
    GALERIES_RESET,
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
    resetGaleriesStatus,
} from '#store/galeries';

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
            dispatch(resetGaleriesStatus());
        }
    };

export default resetGaleriesMiddleware;
