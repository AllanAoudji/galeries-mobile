import { createSelector } from 'reselect';

const selectFramesCurrent = (state: Store.Reducer) => state.frames.current;
const selectFramesById = (state: Store.Reducer) => state.frames.byId;
const selectLikesById = (state: Store.Reducer) => state.likes.byId;

export const selectCurrentFrameLikes = createSelector(
    [selectFramesCurrent, selectFramesById, selectLikesById],
    (framesCurrent, framesById, likesById) => {
        if (!framesCurrent) return undefined;
        const currentFrame = framesById[framesCurrent];
        if (!currentFrame || !currentFrame.likes) return undefined;
        return currentFrame.likes.allIds
            .map((id) => likesById[id])
            .filter((like) => !!like);
    }
);
export const selectCurrentFrameLikesStatus = createSelector(
    [selectFramesById, selectFramesCurrent],
    (framesById, framesCurrent) => {
        if (!framesCurrent) return undefined;
        const frame = framesById[framesCurrent];
        if (!frame || !frame.likes) return undefined;
        return frame.likes.status;
    }
);
export const selectFrameLikes = (frameId: string) =>
    createSelector(
        [selectFramesById, selectLikesById],
        (framesById, likesById) => {
            const frame = framesById[frameId];
            if (!frame || !frame.likes) return undefined;
            return frame.likes.allIds
                .map((id) => likesById[id])
                .filter((like) => !!like);
        }
    );
export const selectFrameLikesStatus = (frameId: string) =>
    createSelector([selectFramesById], (framesById) => {
        const frame = framesById[frameId];
        if (!frame || !frame.likes) return undefined;
        return frame.likes.status;
    });
export const selectLike = (likeId: string) =>
    createSelector([selectLikesById], (likesById) => likesById[likeId]);
