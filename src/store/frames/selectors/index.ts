import { createSelector } from 'reselect';

const framesAllIdsSelector = (state: Store.Reducer) => state.frames.allIds;
const framesByIdSelector = (state: Store.Reducer) => state.frames.byId;
const framesCurrentSelector = (state: Store.Reducer) => state.frames.current;
const framesStatusSelector = (state: Store.Reducer) => state.frames.status;
const meIdSelector = (state: Store.Reducer) => state.me.id;
const galeriesCurrentSelector = (state: Store.Reducer) =>
    state.galeries.current;

export const selectCurrentFrame = createSelector(
    [framesByIdSelector, framesCurrentSelector],
    (framesById, framesCurrent) => {
        if (!framesCurrent) return undefined;
        return framesById[framesCurrent];
    }
);
export const selectCurrentGalerieFramesAllIds = createSelector(
    [framesAllIdsSelector, galeriesCurrentSelector],
    (framesAllIds, galeriesCurrent) => {
        if (!galeriesCurrent) return undefined;
        return framesAllIds[galeriesCurrent] || [];
    }
);
export const selectCurrentGalerieFramesStatus = createSelector(
    [framesStatusSelector, galeriesCurrentSelector],
    (framesStatus, galeriesCurrent) => {
        if (!galeriesCurrent) return undefined;
        return framesStatus[galeriesCurrent] || 'PENDING';
    }
);
export const selectFrame = (frameId?: string | null) =>
    createSelector([framesByIdSelector], (frameById) => {
        if (!frameId) return undefined;
        return frameById[frameId];
    });
export const selectFramesAllIds = createSelector(
    [framesAllIdsSelector],
    (framesAllIds) => framesAllIds[''] || []
);
export const selectFramesMeAllIds = createSelector(
    [framesAllIdsSelector, meIdSelector],
    (framesAllIds, meId) => {
        if (!meId) return undefined;
        return framesAllIds[meId];
    }
);
export const selectFramesStatus = createSelector(
    [framesStatusSelector],
    (framesStatus) => framesStatus[''] || 'PENDING'
);
export const selectFramesMeStatus = createSelector(
    [framesStatusSelector, meIdSelector],
    (framesStatus, meId) => {
        if (!meId) return undefined;
        return framesStatus[meId] || 'PENDING';
    }
);
export const selectFramesFieldsError = (state: Store.Reducer) =>
    state.frames.fieldsError;
export const selectFramesLoadingDelete = (state: Store.Reducer) =>
    state.frames.loading.delete;
export const selectFramesLoadingPost = (state: Store.Reducer) =>
    state.frames.loading.post;
export const selectFramesLoadingPut = (state: Store.Reducer) =>
    state.frames.loading.put;
