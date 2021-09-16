import { createSelector } from 'reselect';

export default createSelector(
    (state: Store.Reducer) => state.frames.byId,
    (state: Store.Reducer) => state.UIStates.currentFrameId,
    (state: Store.Reducer) => state.comments.byId,
    (state: Store.Reducer) => state.users.byId,
    (byId, currentFrameId, commentById, usersById) => {
        if (!currentFrameId) return undefined;
        const comments = (
            byId[currentFrameId] ? byId[currentFrameId].comments.allIds : []
        )
            .filter((id) => commentById[id] !== undefined)
            .map((id) => {
                const comment = commentById[id];
                const user = usersById[comment.userId];
                return {
                    ...comment,
                    user,
                };
            });
        return comments;
    }
);
