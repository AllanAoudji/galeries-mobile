import { createSelector } from 'reselect';

export default createSelector(
    (state: Store.Reducer) => state.frames.byId,
    (state: Store.Reducer) => state.UIStates.currentFrameId,
    (state: Store.Reducer) => state.comments.byId,
    (byId, currentFrameId, commentById) => {
        if (!currentFrameId) return undefined;
        const comments = (
            byId[currentFrameId] ? byId[currentFrameId].comments.allIds : []
        )
            .filter((id) => commentById[id] !== undefined)
            .map((id) => {
                const comment = commentById[id];
                return {
                    ...comment,
                };
            });
        return comments;
    }
);
