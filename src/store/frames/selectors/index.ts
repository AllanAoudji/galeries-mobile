import { createSelector, OutputSelector } from 'reselect';

const framesAllIdsSelect = (state: Store.Reducer) => state.frames.allIds;
const framesByIdSelector = (state: Store.Reducer) => state.frames.byId;
const framesCurrentSelector = (state: Store.Reducer) => state.frames.current;
const framesStatusSelector = (state: Store.Reducer) => state.frames.status;
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
    [framesAllIdsSelect, galeriesCurrentSelector],
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
export const selectFrame: (
    id: string
) => OutputSelector<
    Store.Reducer,
    Store.Models.Frame,
    (res: {
        [key: string]: Store.Models.Frame;
    }) => Store.Models.Frame | undefined
> = (id: string) =>
    createSelector([framesByIdSelector], (frameById) => {
        return frameById[id];
    });
export const selectFramesAllIds = createSelector(
    [framesAllIdsSelect],
    (framesAllIds) => framesAllIds[''] || []
);
export const selectFramesStatus = createSelector(
    [framesStatusSelector],
    (framesStatus) => framesStatus[''] || 'PENDING'
);
export const selectFramesFieldsError = (state: Store.Reducer) =>
    state.frames.fieldsError;
export const selectFramesLoadingDelete = (state: Store.Reducer) =>
    state.frames.loading.delete;
export const selectFramesLoadingPost = (state: Store.Reducer) =>
    state.frames.loading.post;
export const selectFramesLoadingPut = (state: Store.Reducer) =>
    state.frames.loading.put;
