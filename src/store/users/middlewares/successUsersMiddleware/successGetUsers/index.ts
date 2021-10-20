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

    if (allIds.length) {
        dispatch(setUsersById(byId));
        const previousUserId = allIds[allIds.length - 1];
        const previous = byId[previousUserId].userName || '';

        if (galerieId) {
            const oldAllIds = getState().users.allIds[galerieId] || [];
            const newAllIds = combineUsersAllIds(getState, oldAllIds, allIds);

            dispatch(setGalerieUsersAllIds(galerieId, newAllIds));
            dispatch(updateGalerieUsersEnd(galerieId, allIds.length < 20));
            dispatch(updateGalerieUsersPrevious(galerieId, previous));
        } else {
            const oldAllIds = getState().users.allIds[''] || [];
            const newAllIds = combineUsersAllIds(getState, oldAllIds, allIds);

            dispatch(setUsersAllIds(newAllIds));
            dispatch(updateUsersEnd(allIds.length < 20));
            dispatch(updateUsersPrevious(previous));
        }
    }

    if (galerieId) dispatch(updateGalerieUsersStatus(galerieId, 'SUCCESS'));
    else dispatch(updateUsersStatus('SUCCESS'));

    allIds.forEach((id) => {
        const profilePicture = getState().profilePictures.id[id];
        if (!profilePicture) dispatch(getUserCurrentProfilePicture(id));
    });
};

export default successGetUsers;
