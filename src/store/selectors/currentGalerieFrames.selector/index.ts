import { createSelector } from 'reselect';

export default createSelector(
    (state: Store.Reducer) => state.galeries.byId,
    (state: Store.Reducer) => state.UIStates.currentGalerieId,
    (state: Store.Reducer) => state.frames.byId,
    (state: Store.Reducer) => state.galeries.byId,
    (state: Store.Reducer) => state.galeriePictures.byId,
    (state: Store.Reducer) => state.users.byId,
    (
        byId,
        currentGalerieId,
        frameById,
        galerieById,
        galeriePicturesById,
        usersById
    ) => {
        if (!currentGalerieId) return undefined;
        const frames = (
            byId[currentGalerieId] ? byId[currentGalerieId].frames.allIds : []
        )
            .filter((id) => frameById[id] !== undefined)
            .map((id) => {
                const frame = frameById[id];
                const galerie = galerieById[frame.galerieId];
                const galeriePictures = frame.galeriePicturesId.map(
                    (galeriePictureId) => galeriePicturesById[galeriePictureId]
                );
                const user = usersById[frame.userId];
                return {
                    ...frame,
                    galerie,
                    galeriePictures,
                    user,
                };
            });
        return frames;
    }
);
