import { Dispatch, Middleware } from 'redux';

import { ERROR_MESSAGE } from '#helpers/constants';
import { API_SUCCESS } from '#store/api';
import {
    dispatchErrorNotification,
    dispatchUpdateGalerieUsers,
} from '#store/dispatchers';
import { ME } from '#store/genericActionTypes';
import { getGalerie } from '#store/getters';
import {
    setUsersAllIds,
    setUsersById,
    updateUsersEnd,
    updateUsersPrevious,
    updateUsersStatus,
} from '#store/users';
import { getUserCurrentProfilePicture } from '#store/profilePictures';

const successDefaultMethod = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    const galerieId = action.meta.query
        ? action.meta.query.galerieId
        : undefined;
    if (galerieId) {
        const galerie = getGalerie(getState, galerieId);
        if (galerie)
            dispatchUpdateGalerieUsers(dispatch, galerie, {
                status: 'ERROR',
            });
    } else dispatch(updateUsersStatus('ERROR'));
    dispatchErrorNotification(dispatch, ERROR_MESSAGE.METHOD_NOT_FOUND);
};
const successGetUsers = (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    const allIds: string[] = [];
    const byId: { [key: string]: Store.Models.User } = {};
    const { user, users } = action.payload.data;
    if (users && Array.isArray(users)) {
        users.forEach((u: Store.Models.User) => {
            allIds.push(u.id);
            byId[u.id] = u;
        });
    } else if (user && typeof user === 'object') {
        allIds.push(user.id);
        byId[user.id] = user;
    }
    if (allIds.length > 0) {
        dispatch(setUsersById(byId));
        const previousUserId = allIds[allIds.length - 1];
        const previous = byId[previousUserId].userName || '';
        dispatch(setUsersAllIds(allIds));
        dispatch(updateUsersEnd(allIds.length < 20));
        dispatch(updateUsersStatus('SUCCESS'));
        dispatch(updateUsersPrevious(previous));
        allIds.forEach((id) => dispatch(getUserCurrentProfilePicture(id)));
    }
};
const successUsersMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${ME} ${API_SUCCESS}`) {
            switch (action.meta.method) {
                case 'GET':
                    successGetUsers(dispatch, action);
                    break;
                default:
                    successDefaultMethod(dispatch, getState, action);
            }
        }
    };

export default successUsersMiddleware;
