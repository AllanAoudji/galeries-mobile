import { createSelector } from 'reselect';

export default createSelector(
    (state: Store.Reducer) => state.me.id,
    (state: Store.Reducer) => state.users,
    (state: Store.Reducer) => state.profilePictures.byId,
    (id, byId, profilePicturesById) => {
        const me = id ? byId.byId[id] : null;
        if (!me) return null;
        const currentProfilePicture = me.currentProfilePictureId
            ? profilePicturesById[me.currentProfilePictureId]
            : undefined;
        return {
            ...me,
            currentProfilePicture,
        };
    }
);
