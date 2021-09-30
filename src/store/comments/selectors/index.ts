import { createSelector } from 'reselect';

const selectCommentsById = (state: Store.Reducer) => state.comments.byId;
const selectFramesCurrent = (state: Store.Reducer) => state.frames.current;
const selectFramesById = (state: Store.Reducer) => state.frames.byId;

export const selectComment = (commentId: string) =>
    createSelector(
        [selectCommentsById],
        (commentsById) => commentsById[commentId]
    );
export const selectCommentsLoadingDelete = (state: Store.Reducer) =>
    state.comments.loading.delete;
export const selectCommentsLoadingPost = (state: Store.Reducer) =>
    state.comments.loading.post;
export const selectCommentCurrent = (state: Store.Reducer) =>
    state.comments.current;
export const selectCurrentFrameCommentsAllId = createSelector(
    [selectFramesCurrent, selectFramesById],
    (framesCurrent, framesById) => {
        if (!framesCurrent) return undefined;
        const frame = framesById[framesCurrent];
        if (!frame || !frame.comments) return undefined;
        return frame.comments.allIds;
    }
);
export const selectCurrentFrameComments = createSelector(
    [selectCommentsById, selectFramesCurrent, selectFramesById],
    (commentsById, framesCurrent, framesById) => {
        if (!framesCurrent) return undefined;
        const frame = framesById[framesCurrent];
        if (!frame || !frame.comments) return undefined;
        const { allIds } = frame.comments;
        return allIds
            .map((frameId) => commentsById[frameId])
            .filter((item) => !!item);
    }
);
export const selectCurrentFrameCommentsStatus = createSelector(
    [selectFramesById, selectFramesCurrent],
    (framesById, framesCurrent) => {
        if (!framesCurrent) return undefined;
        const frame = framesById[framesCurrent];
        if (!frame || !frame.comments) return 'PENDING';
        return frame.comments.status;
    }
);
export const selectFrameComments = (frameId: string) =>
    createSelector(
        [selectCommentsById, selectFramesById],
        (commentsById, framesById) => {
            const frame = framesById[frameId];
            if (!frame || !frame.comments) return undefined;
            const { allIds } = frame.comments;
            return allIds
                .map((id) => commentsById[id])
                .filter((item) => !!item);
        }
    );
