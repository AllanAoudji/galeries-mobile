import { createSelector } from 'reselect';

const selectFramesById = (state: Store.Reducer) => state.frames.byId;
const selectGaleriesById = (state: Store.Reducer) => state.galeries.byId;
const selectGaleriePicturesById = (state: Store.Reducer) =>
    state.galeriePictures.byId;

export const selectFrameGaleriePictures = (frameId: string) =>
    createSelector(
        [selectFramesById, selectGaleriePicturesById],
        (frameById, galeriePicturesById) => {
            const frame = frameById[frameId];
            if (!frame || !frame.galeriePictures) return undefined;
            const { allIds } = frame.galeriePictures;
            return allIds
                .map((id) => galeriePicturesById[id])
                .filter((galeriePictures) => !!galeriePictures);
        }
    );
export const selectFrameGaleriePicturesStatus = (frameId: string) =>
    createSelector([selectFramesById], (framesById) => {
        const frame = framesById[frameId];
        if (!frame || !frame.galeriePictures) return 'PENDING';
        return frame.galeriePictures.status;
    });
export const selectGalerieCoverPicture = (galerieId: string) =>
    createSelector(
        [selectGaleriesById, selectGaleriePicturesById],
        (galeriesById, galeriePicturesById) => {
            const galerie = galeriesById[galerieId];
            if (!galerie || !galerie.coverPicture) return undefined;
            const { id } = galerie.coverPicture;
            if (!id) return undefined;
            return galeriePicturesById[id];
        }
    );
export const selectGalerieCoverPictureStatus = (galerieId: string) =>
    createSelector([selectGaleriesById], (galeriesById) => {
        const galerie = galeriesById[galerieId];
        if (!galerie || !galerie.coverPicture) return undefined;
        return galerie.coverPicture.status;
    });
