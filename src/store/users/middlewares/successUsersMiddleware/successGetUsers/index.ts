import { Dispatch } from 'redux';

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
        users.forEach((u: Store.Models.User) => {
            allIds.push(u.id);
            byId[u.id] = u;
        });
    } else if (user && typeof user === 'object') {
        allIds.push(user.id);
        byId[user.id] = user;
    }

    if (!allIds.length) return;

    dispatch(setUsersById(byId));

    const previousUserId = allIds[allIds.length - 1];
    const previous = byId[previousUserId].userName || '';

    if (galerieId) {
        dispatch(setGalerieUsersAllIds(galerieId, allIds));
        dispatch(updateGalerieUsersEnd(galerieId, allIds.length < 20));
        dispatch(updateGalerieUsersPrevious(galerieId, previous));
        dispatch(updateGalerieUsersStatus(galerieId, 'SUCCESS'));
    } else {
        dispatch(setUsersAllIds(allIds));
        dispatch(updateUsersEnd(allIds.length < 20));
        dispatch(updateUsersStatus('SUCCESS'));
        dispatch(updateUsersPrevious(previous));
    }

    allIds.forEach((id) => {
        const profilePicture = getState().profilePictures.id[id];
        if (!profilePicture) dispatch(getUserCurrentProfilePicture(id));
    });
};

export default successGetUsers;