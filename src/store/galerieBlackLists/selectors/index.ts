import { createSelector } from 'reselect';

const galerieBlackListsAllIdsSelector = (state: Store.Reducer) =>
    state.galerieBlackLists.allIds;
const galeriesCurrentSelector = (state: Store.Reducer) =>
    state.galeries.current;
const galerieBlackListsByIdSelector = (state: Store.Reducer) =>
    state.galerieBlackLists.byId;
const galerieBlackListsCurrentSelector = (state: Store.Reducer) =>
    state.galerieBlackLists.current;
const galerieBlackListstStatusSelector = (state: Store.Reducer) =>
    state.galerieBlackLists.status;

export const selectcurrentGalerieBlackList = createSelector(
    [galerieBlackListsByIdSelector, galerieBlackListsCurrentSelector],
    (galerieBlackListsById, galerieBlackListsCurrent) => {
        if (!galerieBlackListsCurrent) return undefined;
        return galerieBlackListsById[galerieBlackListsCurrent];
    }
);
export const selectCurrentGalerieGalerieBlackListsAllIds = createSelector(
    [galerieBlackListsAllIdsSelector, galeriesCurrentSelector],
    (galerieBlackListsAllIds, galeriesCurrent) => {
        if (!galeriesCurrent) return undefined;
        return galerieBlackListsAllIds[galeriesCurrent] || [];
    }
);
export const selectCurrentGalerieGalerieBlackListsStatus = createSelector(
    [galeriesCurrentSelector, galerieBlackListstStatusSelector],
    (galeriesCurrent, galerieBlackListstStatus) => {
        if (!galeriesCurrent) return undefined;
        return galerieBlackListstStatus[galeriesCurrent] || 'PENDING';
    }
);
export const selectGalerieBlackLists = (galerieBlackListId?: string | null) =>
    createSelector([galerieBlackListsByIdSelector], (galerieBlackListsById) => {
        if (!galerieBlackListId) return undefined;
        return galerieBlackListsById[galerieBlackListId];
    });
export const selectGalerieBlackListsLoadingDelete = (state: Store.Reducer) =>
    state.galerieBlackLists.loading.delete;
export const selectGalerieBlackListsLoadingPost = (state: Store.Reducer) =>
    state.galerieBlackLists.loading.post;
