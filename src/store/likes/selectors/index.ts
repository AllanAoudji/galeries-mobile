import { createSelector, OutputSelector } from 'reselect';

const framesCurrentSelector = (state: Store.Reducer) => state.frames.current;
const likesAllIdsSelector = (state: Store.Reducer) => state.likes.allIds;
const likesByIdSelector = (state: Store.Reducer) => state.likes.byId;
const likesStatusSelector = (state: Store.Reducer) => state.likes.status;

export const selectCurrentFrameLikesAllIds = createSelector(
    [framesCurrentSelector, likesAllIdsSelector],
    (framesCurrent, likesAllIds) => {
        if (!framesCurrent) return undefined;
        return likesAllIds[framesCurrent];
    }
);
export const selectCurrentFrameLikesStatus = createSelector(
    [likesStatusSelector, framesCurrentSelector],
    (likesStatus, framesCurrent) => {
        if (!framesCurrent) return undefined;
        return likesStatus[framesCurrent];
    }
);
export const selectLike = (likeId: string) =>
    createSelector([likesByIdSelector], (likesById) => likesById[likeId]);
export const selectFrameLikesAllIds: (
    frameId: string
) => OutputSelector<
    Store.Reducer,
    string[],
    (res: { [key: string]: string[] }) => string[] | undefined
> = (frameId: string) =>
    createSelector(
        [likesAllIdsSelector],
        (likesAllIds) => likesAllIds[frameId]
    );
export const selectFrameLikesStatus: (
    frameId: string
) => OutputSelector<
    Store.Reducer,
    Store.Status,
    (res: { [key: string]: Store.Status }) => Store.Status | undefined
> = (frameId: string) =>
    createSelector(
        [likesStatusSelector],
        (likesStatus) => likesStatus[frameId]
    );
