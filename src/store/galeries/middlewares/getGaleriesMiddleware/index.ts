import { Middleware } from 'redux';

import { dispatchGetGalerie, dispatchGetGaleries } from '#store/dispatchers';
import {
    updateGaleriesStatusId,
    updateGaleriesStatusName,
} from '#store/galeries/actionCreators';
import { GALERIES_GET } from '#store/galeries/actionTypes';

const getGaleriesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== GALERIES_GET) return;

        const name = action.meta.query ? action.meta.query.name : undefined;
        if (typeof action.payload === 'string') {
            const status =
                getState().galeries.status.id[action.payload] || 'PENDING';

            if (status.includes('LOADING')) return;

            dispatch(updateGaleriesStatusId('LOADING', action.payload));
            dispatchGetGalerie(dispatch, action.payload);
        } else if (name !== undefined) {
            const end = getState().galeries.end[name] || false;
            const previous = getState().galeries.previous[name] || '';
            const status = getState().galeries.status.name[name] || 'PENDING';

            if (end || status.includes('LOADING')) return;

            let query = '?';
            if (name) query = `${query}name=${name}`;
            if (previous) query = `${query}previous=${previous}`;
            const newStatus =
                status === 'PENDING' ? 'INITIAL_LOADING' : 'LOADING';
            dispatch(updateGaleriesStatusName(newStatus, name));
            dispatchGetGaleries(dispatch, name, query);
        }
    };

export default getGaleriesMiddleware;
