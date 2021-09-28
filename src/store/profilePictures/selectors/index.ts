import { createSelector } from 'reselect';

const selectMeId = (state: Store.Reducer) => state.me.id;
const selectProfilePicturesAllIds = (state: Store.Reducer) =>
    state.profilePictures.allIds;
const selectProfilePicturesById = (state: Store.Reducer) =>
    state.profilePictures.byId;
const selectProfilePicturesCurrent = (state: Store.Reducer) =>
    state.profilePictures.current;
const selectUsersById = (state: Store.Reducer) => state.users.byId;
const selectUsersCurrent = (state: Store.Reducer) => state.users.current;

const selectMe = createSelector(
    [selectMeId, selectUsersById],
    (meId, usersById) => {
        if (!meId) return undefined;
        return usersById[meId];
    }
);

export const selectCurrentProfilepicture = createSelector(
    [selectProfilePicturesById, selectProfilePicturesCurrent],
    (profilePicturesById, profilePicturesCurrent) => {
        if (!profilePicturesCurrent) return undefined;
        return profilePicturesById[profilePicturesCurrent];
    }
);
export const selectCurrentUserCurrentProfilePicture = createSelector(
    [selectProfilePicturesById, selectUsersById, selectUsersCurrent],
    (profilePicturesById, usersById, usersCurrent) => {
        if (!usersCurrent) return undefined;
        const user = usersById[usersCurrent];
        if (
            !user ||
            !user.currentProfilePicture ||
            !user.currentProfilePicture.id
        )
            return undefined;
        return profilePicturesById[user.currentProfilePicture.id];
    }
);
export const selectCurrentUserCurrentProfilePictureStatus = createSelector(
    [selectUsersById, selectUsersCurrent],
    (usersById, usersCurrent) => {
        if (!usersCurrent) return undefined;
        const user = usersById[usersCurrent];
        if (!user || !user.currentProfilePicture) return undefined;
        return user.currentProfilePicture.status;
    }
);
export const selectMeCurrentProfilePicture = createSelector(
    [selectMe, selectProfilePicturesById],
    (me, profilePicturesById) => {
        if (!me || !me.currentProfilePicture || !me.currentProfilePicture.id)
            return undefined;
        return profilePicturesById[me.currentProfilePicture.id];
    }
);
export const selectMeCurrentProfilePictureStatus = createSelector(
    [selectMe],
    (me) => {
        if (!me || !me.currentProfilePicture || !me.currentProfilePicture.id)
            return undefined;
        return me.currentProfilePicture.status;
    }
);
export const selectProfilePictures = createSelector(
    [selectProfilePicturesAllIds, selectProfilePicturesById],
    (profilePicturesAllIds, profilePicturesById) =>
        profilePicturesAllIds
            .map((id) => profilePicturesById[id])
            .filter((item) => !!item)
);
export const selectProfilePictureId = (profilePictureId: string) =>
    createSelector(
        [selectProfilePicturesById],
        (profilePicturesById) => profilePicturesById[profilePictureId]
    );
export const selectProfilePictureStatus = (state: Store.Reducer) =>
    state.profilePictures.status;
export const selectUserCurrentProfilePicture = (userId: string) =>
    createSelector(
        [selectProfilePicturesById, selectUsersById],
        (profilePicturesById, usersById) => {
            const user = usersById[userId];
            if (
                !user ||
                !user.currentProfilePicture ||
                !user.currentProfilePicture.id
            )
                return undefined;
            return profilePicturesById[user.currentProfilePicture.id];
        }
    );
export const selectUserCurrentProfilePictureStatus = (userId: string) =>
    createSelector([selectUsersById], (usersById) => {
        const user = usersById[userId];
        if (!user || !user.currentProfilePicture) return undefined;
        return user.currentProfilePicture.status;
    });
