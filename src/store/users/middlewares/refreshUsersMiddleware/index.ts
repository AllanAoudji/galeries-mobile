import { Middleware } from 'redux';

import {
    dispatchRefreshGalerieUsers,
    dispatchRefreshUsers,
} from '#store/dispatchers';
import { updateUsersStatus } from '#store/users/actionCreators';
import { USERS_REFRESH } from '#store/users/actionTypes';

const refreshUsersMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== USERS_REFRESH) return;

        const galerieId = action.meta.query
            ? action.meta.query.galerieId
            : undefined;

        if (galerieId) {
            const status = getState().users.status[galerieId] || 'PENDING';
            if (status.includes('LOADING')) return;
            if (status === 'REFRESH') return;

            dispatch(updateUsersStatus('REFRESH'));
            dispatchRefreshGalerieUsers(dispatch, galerieId);
        } else {
            const status = getState().users.status[''] || 'PENDING';
            if (status.includes('LOADING')) return;
            if (status === 'REFRESH') return;

            dispatch(updateUsersStatus('REFRESH'));
            dispatchRefreshUsers(dispatch);
        }
    };

export default refreshUsersMiddleware;
