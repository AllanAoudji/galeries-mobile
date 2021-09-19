import { createSelector } from 'reselect';

export default createSelector(
    (state: Store.Reducer) => state.UIStates.currentGalerieId,
    (state: Store.Reducer) => state.galeries.byId,
    (state: Store.Reducer) => state.frames.byId,
    (state: Store.Reducer) => state.galeriePictures.byId,
    (state: Store.Reducer) => state.users.byId,
    (state: Store.Reducer) => state.profilePictures.byId,
    (
        currentGalerieId,
        galerieById,
        frameById,
        galeriePicturesById,
        usersById,
        profilePicturesById
    ) => {
        if (!currentGalerieId) return undefined;
        const currentGalerie = galerieById[currentGalerieId];
        if (!currentGalerie) return undefined;
        const { allIds } = currentGalerie.frames;
        const frames = allIds
            ? allIds
                  .filter((id) => frameById[id] !== undefined)
                  .map((id) => {
                      const frame = frameById[id];
                      const galerie = galerieById[frame.galerieId];
                      const galeriePictures = frame.galeriePicturesId.map(
                          (galeriePictureId) =>
                              galeriePicturesById[galeriePictureId]
                      );
                      const user = usersById[frame.userId];
                      let currentProfilePicture:
                          | Store.Models.ProfilePicture
                          | undefined;
                      if (user)
                          currentProfilePicture = user.currentProfilePictureId
                              ? profilePicturesById[
                                    user.currentProfilePictureId
                                ]
                              : undefined;
                      return {
                          ...frame,
                          galerie,
                          galeriePictures,
                          user: {
                              ...user,
                              currentProfilePicture,
                          },
                      };
                  })
            : allIds;
        return frames;
    }
);
