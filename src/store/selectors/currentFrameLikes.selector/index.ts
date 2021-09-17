import { createSelector } from 'reselect';

export default createSelector(
    (state: Store.Reducer) => state.UIStates.currentFrameId,
    (state: Store.Reducer) => state.frames.byId,
    (state: Store.Reducer) => state.likes.byId,
    (state: Store.Reducer) => state.users.byId,
    (currentFrameId, frameById, likesById, usersById) => {
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
                      return {
                          ...like,
                          user,
                      };
                  })
            : allIds;
        return likes;
    }
);
