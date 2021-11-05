import { Dispatch } from 'redux';

import { combineUsersAllIds } from '#store/combineAllIds';
import { getUserCurrentProfilePicture } from '#store/profilePictures/actionCreators';
import {
    setGalerieUsersAllIds,
    setUsersAllIds,
    setUsersById,
    updateGalerieUsersEnd,
    updateGalerieUsersPrevious,
    updateGalerieUsersStatus,
    updateUsersEnd,
    updateUsersStatus,
    updateUsersPrevious,
} from '#store/users/actionCreators';
import { setGalerieRolesById } from '#store/galerieRoles/actionCreators';

const successGetUsers = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    const allIds: string[] = [];
    const byId: { [key: string]: Store.Models.User } = {};
    const { user, users } = action.payload.data;
    const galerieId = action.meta.query
        ? action.meta.query.galerieId
        : undefined;

    if (users && Array.isArray(users)) {
        users.forEach((u: Store.Models.User & { galerieRole?: Store.Role }) => {
            const returnedUser = { ...u };
            if (returnedUser.galerieRole) delete returnedUser.galerieRole;
            allIds.push(u.id);
            byId[u.id] = returnedUser;
        });
    } else if (user && typeof user === 'object') {
        allIds.push(user.id);
        byId[user.id] = user;
    }

    dispatch(setUsersById(byId));

    const previousUserId =
        allIds.length > 0 ? allIds[allIds.length - 1] : undefined;
    const previous = previousUserId ? byId[previousUserId].userName : undefined;

    if (galerieId && user === undefined) {
        let oldAllIds: string[];
        if (action.meta.refresh) oldAllIds = [];
        else oldAllIds = getState().users.allIds[galerieId] || [];
        const newAllIds = combineUsersAllIds(getState, oldAllIds, allIds);

        dispatch(setGalerieUsersAllIds(galerieId, newAllIds));
        dispatch(updateGalerieUsersEnd(galerieId, allIds.length < 20));
        if (previous) dispatch(updateGalerieUsersPrevious(galerieId, previous));
    } else if (user === undefined) {
        let oldAllIds: string[];
        if (action.meta.refresh) oldAllIds = [];
        else oldAllIds = getState().users.allIds[''] || [];
        const newAllIds = combineUsersAllIds(getState, oldAllIds, allIds);

        dispatch(setUsersAllIds(newAllIds));
        dispatch(updateUsersEnd(allIds.length < 20));
        if (previous) dispatch(updateUsersPrevious(previous));
    }

    if (galerieId) dispatch(updateGalerieUsersStatus(galerieId, 'SUCCESS'));
    else dispatch(updateUsersStatus('SUCCESS'));

    if (galerieId) {
        const usersRole: { [key: string]: Store.Role } = {};
        const oldById = getState().galerieRoles.byId[galerieId] || {};
        if (users && Array.isArray(users))
            users.forEach(
                (u: Store.Models.User & { galerieRole?: Store.Role }) => {
                    if (u.galerieRole) usersRole[u.id] = u.galerieRole;
                }
            );
        else if (user && typeof user === 'object' && !!user.galerieRole)
            usersRole[user.id] = user.galerieRole;
        dispatch(setGalerieRolesById(galerieId, { ...oldById, ...usersRole }));
    }

    allIds.forEach((id) => {
        const profilePicture = getState().profilePictures.id[id];
        if (!profilePicture) dispatch(getUserCurrentProfilePicture(id));
    });
};

export default successGetUsers;
