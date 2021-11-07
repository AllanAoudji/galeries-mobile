import { createSelector, OutputSelector } from 'reselect';

const meIdSelector = (state: Store.Reducer) => state.me.id;
const profliePicturesById = (state: Store.Reducer) =>
    state.profilePictures.byId;
const profilePicturesCurrentSelector = (state: Store.Reducer) =>
    state.profilePictures.current;
const profilePicturesIdSelector = (state: Store.Reducer) =>
    state.profilePictures.id;
const profilePicturesStatusSelector = (state: Store.Reducer) =>
    state.profilePictures.status;
const usersCurrentSelector = (state: Store.Reducer) => state.users.current;

export const selectCurrentProfilepictureId = createSelector(
    [profilePicturesIdSelector, profilePicturesCurrentSelector],
    (profilePicturesId, profilePicturesCurrent) => {
        if (!profilePicturesCurrent) return undefined;
        return profilePicturesId[profilePicturesCurrent];
    }
);
export const selectCurrentProfilePictureStatus = createSelector(
    [profilePicturesIdSelector, profilePicturesCurrentSelector],
    (profilePicturesId, profilePicturesCurrent) => {
        if (!profilePicturesCurrent) return undefined;
        return profilePicturesId[profilePicturesCurrent];
    }
);
export const selectCurrentUserCurrentProfilePictureId = createSelector(
    [profilePicturesIdSelector, usersCurrentSelector],
    (profliePicturesId, usersCurrent) => {
        if (!usersCurrent) return undefined;
        return profliePicturesId[usersCurrent];
    }
);
export const selectCurrentUserCurrentProfilePictureStatus = createSelector(
    [profilePicturesStatusSelector, usersCurrentSelector],
    (profliePicturesStatus, usersCurrent) => {
        if (!usersCurrent) return undefined;
        return profliePicturesStatus[usersCurrent];
    }
);
export const selectMeCurrentProfilePictureId = createSelector(
    [meIdSelector, profilePicturesIdSelector],
    (meId, profilePicturesId) => {
        if (!meId) return undefined;
        return profilePicturesId[meId];
    }
);
export const selectMeCurrentProfilePictureStatus = createSelector(
    [meIdSelector, profilePicturesStatusSelector],
    (meId, profilePicturesStatus) => {
        if (!meId) return undefined;
        return profilePicturesStatus[meId];
    }
);
export const selectProfilePicturesAllIds = (state: Store.Reducer) =>
    state.profilePictures.allIds;
export const selectProfilePicture = (profilePictureId?: string | null) =>
    createSelector([profliePicturesById], (profilePicturesById) => {
        if (!profilePictureId) return undefined;
        return profilePicturesById[profilePictureId];
    });
export const selectProfilePicturesStatus = (profilePictureId: string) =>
    createSelector(
        [profilePicturesStatusSelector],
        (profliePicturesStatus) =>
            profliePicturesStatus[profilePictureId] || 'PENDING'
    );
export const selectUserCurrentProfilePictureId = (userId?: string | null) =>
    createSelector([profilePicturesIdSelector], (profilePicturesId) => {
        if (!userId) return undefined;
        return profilePicturesId[userId];
    });
export const selectUserCurrentProfilePictureStatus: (
    userId: string
) => OutputSelector<
    Store.Reducer,
    Store.Status,
    (res: { [key: string]: Store.Status }) => Store.Status | undefined
> = (userId: string) =>
    createSelector(
        [profilePicturesStatusSelector],
        (profilePicturesStatus) => profilePicturesStatus[userId]
    );
export const selectProfilePicturesLoadingDelete = (state: Store.Reducer) =>
    state.profilePictures.loading.delete;
export const selectProfilePicturesLoadingPost = (state: Store.Reducer) =>
    state.profilePictures.loading.post;
