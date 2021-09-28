import { Middleware } from 'redux';

import {
    dispatchGetGalerieUsers,
    dispatchGetUser,
    dispatchGetUsers,
    dispatchUpdateGalerieUsers,
} from '#store/dispatchers';
import {
    getGalerie,
    getUser,
    getUsersEnd,
    getUsersPrevious,
    getUsersStatus,
} from '#store/getters';
import { USERS_GET, updateUsersStatus } from '#store/users';

const getUsersMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === USERS_GET) {
            const galerieId = action.meta.query
                ? action.meta.query.galerieId
                : undefined;
            const userId = action.payload;
            if (galerieId) {
                const galerie = getGalerie(getState, galerieId);
                const end = galerie.users ? galerie.users.end : false;
                const status = galerie.users ? galerie.users.status : 'PENDING';
                if (!end && !status.includes('LOADING')) {
                    const newStatus: Store.Status =
                        status === 'PENDING' ? 'INITIAL_LOADING' : 'LOADING';
                    const previous = galerie.users
                        ? galerie.users.previous || ''
                        : '';
                    dispatchUpdateGalerieUsers(dispatch, galerie, {
                        status: newStatus,
                    });
                    dispatchGetGalerieUsers(dispatch, galerieId, previous);
                }
            } else if (typeof userId === 'string') {
                const user = getUser(getState, userId);
                if (!user) dispatchGetUser(dispatch, userId);
            } else {
                const end = getUsersEnd(getState);
                const status = getUsersStatus(getState);
                if (!end && !status.includes('LOADING')) {
                    const newStatus: Store.Status =
                        status === 'PENDING' ? 'INITIAL_LOADING' : 'LOADING';
                    const previous = getUsersPrevious(getState);
                    dispatch(updateUsersStatus(newStatus));
                    dispatchGetUsers(dispatch, previous);
                }
            }
        }
    };

export default getUsersMiddleware;
