import { createSelector } from 'reselect';

export default createSelector(
    (state: Store.Reducer) => state.frames.byId,
    (state: Store.Reducer) => state.UIStates.currentFrameId,
    (byId, currentFrameId) =>
        currentFrameId ? { ...byId[currentFrameId] } : undefined
);
