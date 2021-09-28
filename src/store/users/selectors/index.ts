import { createSelector } from 'reselect';

const selectCommentsById = (state: Store.Reducer) => state.comments.byId;
const selectFramesById = (state: Store.Reducer) => state.frames.byId;
const selectGalerieCurrent = (state: Store.Reducer) => state.galeries.current;
const selectGaleriesById = (state: Store.Reducer) => state.galeries.byId;
const selectUsersAllIds = (state: Store.Reducer) => state.users.allIds;
const selectUsersById = (state: Store.Reducer) => state.users.byId;
const selectUsersCurrent = (state: Store.Reducer) => state.users.current;

export const selectCommentStatus = (commentId: string) =>
    createSelector(
        [selectCommentsById, selectUsersById],
        (commentsById, usersById) => {
            const comment = commentsById[commentId];
            if (!comment || !comment.user) return undefined;
            return usersById[comment.user.id];
        }
    );
export const selectFrameUser = (frameId: string) =>
    createSelector(
        [selectFramesById, selectUsersById],
        (framesById, usersById) => {
            const frame = framesById[frameId];
            if (!frame) return undefined;
            return usersById[frame.userId];
        }
    );
export const selectCurrentUser = createSelector(
    [selectUsersById, selectUsersCurrent],
    (usersById, usersCurrent) => {
        if (!usersCurrent) return undefined;
        return usersById[usersCurrent];
    }
);
export const selectGalerieUser = createSelector(
    [selectGaleriesById, selectGalerieCurrent, selectUsersById],
    (galeriesById, currentGalerie, usersById) => {
        if (!currentGalerie) return undefined;
        const galerie = galeriesById[currentGalerie];
        if (!galerie || !galerie.users) return undefined;
        const galerieUsers = galerie.users.allIds;
        return galerieUsers.map((id) => usersById[id]).filter((user) => !!user);
    }
);
export const selectUserId = (userId: string) =>
    createSelector([selectUsersById], (usersById) => usersById[userId]);
export const selectUsers = createSelector(
    [selectUsersAllIds, selectUsersById],
    (allIds, byId) => allIds.map((id) => byId[id]).filter((user) => !!user)
);
export const selectUsersStatus = (state: Store.Reducer) => state.users.status;
