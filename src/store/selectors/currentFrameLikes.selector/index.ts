import { createSelector } from 'reselect';

export default createSelector(
    (state: Store.Reducer) => state.frames.byId,
    (state: Store.Reducer) => state.UIStates.currentFrameId,
    (state: Store.Reducer) => state.likes.byId,
    (state: Store.Reducer) => state.users.byId,
    (byId, currentFrameId, likesById, usersById) => {
        if (!currentFrameId) return undefined;
        const likes = (
            byId[currentFrameId] ? byId[currentFrameId].likes.allIds : []
        )
            .filter((id) => likesById[id] !== undefined)
            .map((id) => {
                const like = likesById[id];
                const user = usersById[like.userId];
                return {
                    ...like,
                    user,
                };
            });
        return likes;
    }
);
