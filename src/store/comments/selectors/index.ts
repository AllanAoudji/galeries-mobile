import { createSelector, OutputSelector } from 'reselect';

const selectCommentsAllIds = (state: Store.Reducer) => state.comments.allIds;
const selectCommentsById = (state: Store.Reducer) => state.comments.byId;
const selectCommentsStatus = (state: Store.Reducer) => state.comments.status;
const selectFramesCurrent = (state: Store.Reducer) => state.frames.current;

export const selectComment = (commentId: string) =>
    createSelector(
        [selectCommentsById],
        (commentsById) => commentsById[commentId]
    );
export const selectCommentCommentsAllIds: (
    commentId: string
) => OutputSelector<
    Store.Reducer,
    string[],
    (res: { [key: string]: string[] }) => string[] | undefined
> = (commentId: string) =>
    createSelector(
        [selectCommentsAllIds],
        (commentsAllIds) => commentsAllIds[commentId]
    );
export const selectCommentCommentsStatus: (
    commentId: string
) => OutputSelector<
    Store.Reducer,
    Store.Status,
    (res: { [key: string]: Store.Status }) => Store.Status | undefined
> = (commentId: string) =>
    createSelector(
        [selectCommentsStatus],
        (commentsStatus) => commentsStatus[commentId]
    );
export const selectCommentsLoadingDelete = (state: Store.Reducer) =>
    state.comments.loading.delete;
export const selectCommentsLoadingPost = (state: Store.Reducer) =>
    state.comments.loading.post;
export const selectCommentCurrent = (state: Store.Reducer) =>
    state.comments.current;
export const selectCurrentFrameCommentsAllId = createSelector(
    [selectCommentsAllIds, selectFramesCurrent],
    (commentsAllIds, framesCurrent) => {
        if (!framesCurrent) return undefined;
        return commentsAllIds[framesCurrent];
    }
);
export const selectCurrentFrameCommentsStatus = createSelector(
    [selectCommentsStatus, selectFramesCurrent],
    (commentsStatus, framesCurrent) => {
        if (!framesCurrent) return undefined;
        return commentsStatus[framesCurrent];
    }
);
export const selectFrameCommentsAllIds: (
    frameId: string
) => OutputSelector<
    Store.Reducer,
    string[],
    (res: { [key: string]: string[] }) => string[] | undefined
> = (frameId: string) =>
    createSelector(
        [selectCommentsAllIds],
        (commentsAllIds) => commentsAllIds[frameId]
    );
export const selectFrameCommentsStatus = (frameId: string) =>
    createSelector(
        [selectCommentsStatus],
        (commentsStatus) => commentsStatus[frameId]
    );
