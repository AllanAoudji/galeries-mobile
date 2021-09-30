import { createSelector } from 'reselect';

const selectFramesById = (state: Store.Reducer) => state.frames.byId;
const selectFramesCurrent = (state: Store.Reducer) => state.frames.current;
const selectGaleriesById = (state: Store.Reducer) => state.galeries.byId;
const selectGaleriesCurrent = (state: Store.Reducer) => state.galeries.current;

export const selectCurrentFrame = createSelector(
    [selectFramesById, selectFramesCurrent],
    (framesById, framesCurrent) => {
        if (!framesCurrent) return undefined;
        return framesById[framesCurrent];
    }
);
export const selectCurrentGalerieFrame = createSelector(
    [selectFramesById, selectGaleriesById, selectGaleriesCurrent],
    (frameById, galeriesById, galeriesCurrent) => {
        if (!galeriesCurrent) return undefined;
        const galerie = galeriesById[galeriesCurrent];
        if (!galerie || !galerie.frames) return undefined;
        const galerieFrames = galerie.frames.allIds;
        return galerieFrames
            .map((id) => frameById[id])
            .filter((frame) => !!frame);
    }
);
export const selectCurrentGalerieFrameStatus = createSelector(
    [selectGaleriesById, selectGaleriesCurrent],
    (galeriesById, galeriesCurrent) => {
        if (!galeriesCurrent) return undefined;
        const galerie = galeriesById[galeriesCurrent];
        if (!galerie || !galerie.frames) return undefined;
        return galerie.frames.status;
    }
);
export const selectFramesAllIds = (state: Store.Reducer) => state.frames.allIds;
export const selectFrame = (id: string) =>
    createSelector([selectFramesById], (frameById) => frameById[id]);
export const selectFrames = createSelector(
    [selectFramesAllIds, selectFramesById],
    (framesAllIds, framesById) =>
        framesAllIds.map((id) => framesById[id]).filter((frame) => !!frame)
);
export const selectFramesFieldsError = (state: Store.Reducer) =>
    state.frames.fieldsError;
export const selectFramesLoadingDelete = (state: Store.Reducer) =>
    state.frames.loading.delete;
export const selectFramesLoadingPost = (state: Store.Reducer) =>
    state.frames.loading.post;
export const selectFramesLoadingPut = (state: Store.Reducer) =>
    state.frames.loading.put;
export const selectFramesStatus = (state: Store.Reducer) => state.frames.status;
