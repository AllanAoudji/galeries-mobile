import { createSelector, OutputSelector } from 'reselect';

const currentFramesSelector = (state: Store.Reducer) => state.frames.current;
const currentGaleriesSelector = (state: Store.Reducer) =>
    state.galeries.current;
const galeriePicturesAllIdsSelector = (state: Store.Reducer) =>
    state.galeriePictures.allIds;
const galeriePicturesByIdSelector = (state: Store.Reducer) =>
    state.galeriePictures.byId;
const galeriePicturesIdSelector = (state: Store.Reducer) =>
    state.galeriePictures.id;
const galeriePicturesStatusSelector = (state: Store.Reducer) =>
    state.galeriePictures.status;

export const selectCurrentFrameGaleriePicturesAllIds = createSelector(
    [currentFramesSelector, galeriePicturesAllIdsSelector],
    (currentFrames, galeriePicturesAllIds) => {
        if (!currentFrames) return undefined;
        return galeriePicturesAllIds[currentFrames];
    }
);
export const selectCurrentFrameGaleriePicturesStatus = createSelector(
    [currentFramesSelector, galeriePicturesStatusSelector],
    (currentFrames, galeriePicturesStatus) => {
        if (!currentFrames) return undefined;
        return galeriePicturesStatus[currentFrames];
    }
);
export const selectCurrentGalerieCoverPictureId = createSelector(
    [currentGaleriesSelector, galeriePicturesIdSelector],
    (currentGaleries, galeriePicturesId) => {
        if (!currentGaleries) return undefined;
        return galeriePicturesId[currentGaleries];
    }
);
export const selectCurrentGalerieCoverPictureStatus = createSelector(
    [currentGaleriesSelector, galeriePicturesStatusSelector],
    (currentGaleries, galeriePicturesStatus) => {
        if (!currentGaleries) return undefined;
        return galeriePicturesStatus[currentGaleries];
    }
);
export const selectFrameGaleriePicturesAllIds = (frameId?: string | null) =>
    createSelector([galeriePicturesAllIdsSelector], (galeriePicturesAllIds) => {
        if (!frameId) return undefined;
        return galeriePicturesAllIds[frameId];
    });
export const selectFrameGaleriePicturesStatus = (frameId?: string | null) =>
    createSelector([galeriePicturesStatusSelector], (galeriePicturesStatus) => {
        if (!frameId) return undefined;
        return galeriePicturesStatus[frameId] || 'PENDING';
    });
export const selectGalerieCoverPictureId = (galerieId?: string | null) =>
    createSelector([galeriePicturesIdSelector], (galeriePicturesId) => {
        if (!galerieId) return undefined;
        return galeriePicturesId[galerieId];
    });
export const selectGalerieCoverPictureStatus: (
    galerieId: string
) => OutputSelector<
    Store.Reducer,
    Store.Status,
    (res: { [key: string]: Store.Status }) => Store.Status | undefined
> = (galerieId: string) =>
    createSelector(
        [galeriePicturesStatusSelector],
        (galeriePicturesStatus) => galeriePicturesStatus[galerieId] || 'PENDING'
    );
export const selectGaleriePicture = (galeriePictureId?: string | null) =>
    createSelector([galeriePicturesByIdSelector], (galeriePicturesById) => {
        if (!galeriePictureId) return undefined;
        return galeriePicturesById[galeriePictureId];
    });
