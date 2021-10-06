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
export const selectFrameGaleriePicturesAllIds = (frameId: string | undefined) =>
    createSelector([galeriePicturesAllIdsSelector], (galeriePicturesAllIds) => {
        if (!frameId) return undefined;
        return galeriePicturesAllIds[frameId];
    });
export const selectFrameGaleriePicturesStatus: (
    frameId: string
) => OutputSelector<
    Store.Reducer,
    Store.Status,
    (res: { [key: string]: Store.Status }) => Store.Status | undefined
> = (frameId: string) =>
    createSelector(
        [galeriePicturesStatusSelector],
        (galeriePicturesStatus) => galeriePicturesStatus[frameId]
    );
export const selectGalerieCoverPictureId: (
    galerieId: string
) => OutputSelector<
    Store.Reducer,
    string,
    (res: { [key: string]: string }) => string | undefined
> = (galerieId: string) =>
    createSelector(
        [galeriePicturesIdSelector],
        (galeriePicturesId) => galeriePicturesId[galerieId]
    );
export const selectGalerieCoverPictureStatus: (
    galerieId: string
) => OutputSelector<
    Store.Reducer,
    Store.Status,
    (res: { [key: string]: Store.Status }) => Store.Status | undefined
> = (galerieId: string) =>
    createSelector(
        [galeriePicturesStatusSelector],
        (galeriePicturesStatus) => galeriePicturesStatus[galerieId]
    );
export const selectGaleriePicture: (
    galeriePictureId: string
) => OutputSelector<
    Store.Reducer,
    Store.Models.GaleriePicture,
    (res: {
        [key: string]: Store.Models.GaleriePicture;
    }) => Store.Models.GaleriePicture | undefined
> = (galeriePictureId: string) =>
    createSelector(
        [galeriePicturesByIdSelector],
        (galeriePicturesById) => galeriePicturesById[galeriePictureId]
    );
