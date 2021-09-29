import { Middleware } from 'redux';

import { dispatchGetGalerie, dispatchGetGaleries } from '#store/dispatchers';
import { updateGaleriesStatus } from '#store/galeries/actionCreators';
import { GALERIES_GET } from '#store/galeries/actionTypes';
import {
    getGaleriesEnd,
    getGaleriesPrevious,
    getGaleriesStatus,
} from '#store/getters';

const getGaleriesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === GALERIES_GET) {
            const name = action.meta.query ? action.meta.query.name : undefined;
            if (typeof action.payload === 'string')
                dispatchGetGalerie(dispatch, action.payload);
            else if (name) {
                const end = getGaleriesEnd(getState, name);
                const previous = getGaleriesPrevious(getState, name) || '';
                const status = getGaleriesStatus(getState, name) || 'PENDING';
                if (!end && !status.includes('LOADING')) {
                    let query = '?';
                    if (name) query = `${query}name=${name}`;
                    if (previous) query = `${query}previous=${previous}`;
                    const newStatus =
                        status === 'PENDING' ? 'INITIAL_LOADING' : 'LOADING';
                    dispatch(updateGaleriesStatus(newStatus, name));
                    dispatchGetGaleries(dispatch, name, query);
                }
            }
        }
    };

export default getGaleriesMiddleware;
