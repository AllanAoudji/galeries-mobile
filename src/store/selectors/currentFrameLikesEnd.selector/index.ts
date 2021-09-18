import { createSelector } from 'reselect';

export default createSelector(
    (state: Store.Reducer) => state.frames.byId,
    (state: Store.Reducer) => state.UIStates.currentFrameId,
    (byId, currentFrameId) => {
        if (!currentFrameId) return undefined;
        return byId[currentFrameId]
            ? byId[currentFrameId].likes.end
            : undefined;
    }
);
