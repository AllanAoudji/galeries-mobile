import { createSelector } from 'reselect';

export default createSelector(
    (state: Store.Reducer) => state.UIStates.currentFrameId,
    (state: Store.Reducer) => state.frames.byId,
    (state: Store.Reducer) => state.likes.byId,
    (state: Store.Reducer) => state.users.byId,
    (state: Store.Reducer) => state.profilePictures.byId,
    (currentFrameId, frameById, likesById, usersById, profilePicturesById) => {
        if (!currentFrameId) return undefined;
        const currentFrame = frameById[currentFrameId];
        if (!currentFrameId) return undefined;
        const { allIds } = currentFrame.likes;
        const likes = allIds
            ? allIds
                  .filter((id) => likesById[id] !== undefined)
                  .map((id) => {
                      const like = likesById[id];
                      const user = usersById[like.userId];
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
                          ...like,
                          user: {
                              ...user,
                              currentProfilePicture,
                          },
                      };
                  })
            : allIds;
        return likes;
    }
);
