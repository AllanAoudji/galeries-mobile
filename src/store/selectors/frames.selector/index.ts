import { createSelector } from 'reselect';

export default createSelector(
    (state: Store.Reducer) => state.frames.allIds,
    (state: Store.Reducer) => state.frames.byId,
    (state: Store.Reducer) => state.galeries.byId,
    (state: Store.Reducer) => state.galeriePictures.byId,
    (state: Store.Reducer) => state.users.byId,
    (state: Store.Reducer) => state.profilePictures.byId,
    (
        allIds,
        framesById,
        galeriesById,
        galeriePicturesById,
        usersById,
        profilePicturesById
    ) => {
        return allIds
            ? allIds
                  .filter((id) => framesById[id] !== undefined)
                  .map((id) => {
                      const frame = framesById[id];
                      const galerie = galeriesById[frame.galerieId];
                      const galeriePictures = frame.galeriePicturesId
                          ? frame.galeriePicturesId.map(
                                (galeriePictureId) =>
                                    galeriePicturesById[galeriePictureId]
                            )
                          : undefined;
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
            : undefined;
    }
);
