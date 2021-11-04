import { Middleware } from 'redux';

import { dispatchRefreshGaleries } from '#store/dispatchers';
import { updateGaleriesStatusName } from '#store/galeries/actionCreators';
import { GALERIES_REFRESH } from '#store/galeries/actionTypes';

const refreshGaleriesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== GALERIES_REFRESH) return;

        const name = action.meta.query ? action.meta.query.name : '';

        const status = getState().galeries.status.name[name] || 'PENDING';
        if (status.includes('LOADING')) return;
        if (status === 'REFRESH') return;

        dispatch(updateGaleriesStatusName('REFRESH', name));
        dispatchRefreshGaleries(dispatch, name);
    };

export default refreshGaleriesMiddleware;
