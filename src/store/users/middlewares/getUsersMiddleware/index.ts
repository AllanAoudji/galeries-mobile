import { Middleware } from 'redux';

import {
    dispatchGetGalerieUsers,
    dispatchGetNotificationUsers,
    dispatchGetUser,
    dispatchGetUsers,
} from '#store/dispatchers';
import {
    updateGalerieUsersStatus,
    updateUsersStatus,
} from '#store/users/actionCreators';
import { USERS_GET } from '#store/users/actionTypes';

const getUsersMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type !== USERS_GET) return;

        const galerieId = action.meta.query
            ? action.meta.query.galerieId
            : undefined;
        const notificationId = action.meta.query
            ? action.meta.query.notificationId
            : undefined;
        const userId = action.payload;

        if (galerieId) {
            const end = getState().users.end[galerieId] || false;
            const status = getState().users.status[galerieId] || 'PENDING';
            if (end) return;
            if (status.includes('LOADING')) return;
            if (status === 'REFRESH') return;

            const newStatus: Store.Status =
                status === 'PENDING' ? 'INITIAL_LOADING' : 'LOADING';
            const previous = getState().users.previous[galerieId];

            dispatch(updateGalerieUsersStatus(galerieId, newStatus));
            dispatchGetGalerieUsers(dispatch, galerieId, previous);
        } else if (notificationId) {
            const status = getState().users.status[notificationId] || 'PENDING';
            if (status.includes('LOADING')) return;
            if (status === 'REFRESH') return;

            dispatch(updateGalerieUsersStatus(notificationId, 'LOADING'));
            dispatchGetNotificationUsers(dispatch, notificationId);
        } else if (typeof userId === 'string') {
            const user = getState().users.byId[userId];
            if (!user) dispatchGetUser(dispatch, userId);
        } else {
            const end = getState().users.end[''] || false;
            const status = getState().users.status[''] || 'PENDING';
            if (end) return;
            if (status.includes('LOADING')) return;
            if (status === 'REFRESH') return;

            const newStatus: Store.Status =
                status === 'PENDING' ? 'INITIAL_LOADING' : 'LOADING';
            const previous = getState().users.previous[''];
            dispatch(updateUsersStatus(newStatus));
            dispatchGetUsers(dispatch, previous);
        }
    };

export default getUsersMiddleware;
