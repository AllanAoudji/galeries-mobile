import { createSelector } from 'reselect';

export default createSelector(
    (state: Store.Reducer) => state.UIStates.currentFrameId,
    (state: Store.Reducer) => state.frames.byId,
    (state: Store.Reducer) => state.comments.byId,
    (state: Store.Reducer) => state.users.byId,
    (currentFrameId, frameById, commentById, usersById) => {
        if (!currentFrameId) return undefined;
        const currentFrame = frameById[currentFrameId];
        if (!currentFrame) return undefined;
        const { allIds } = currentFrame.comments;
        const comments = allIds
            ? allIds
                  .filter((id) => commentById[id] !== undefined)
                  .map((id) => {
                      const comment = commentById[id];
                      const user = usersById[comment.userId];
                      return {
                          ...comment,
                          user,
                      };
                  })
            : allIds;
        return comments;
    }
);
