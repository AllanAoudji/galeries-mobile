import { createSelector } from 'reselect';

const betaKeysByIdSelector = (state: Store.Reducer) => state.betaKeys.byId;
const betaKeysCurrentSelector = (state: Store.Reducer) =>
    state.betaKeys.current;

export const selectBetaKey = (betaKeyId?: string | null) =>
    createSelector([betaKeysByIdSelector], (betaKeyById) => {
        if (!betaKeyId) return undefined;
        return betaKeyById[betaKeyId];
    });
export const selectBetaKeysAllIds = (state: Store.Reducer) =>
    state.betaKeys.allIds;
export const selectBetaKeysFieldsError = (state: Store.Reducer) =>
    state.betaKeys.fieldsError;
export const selectBetaKeysLoadingDelete = (state: Store.Reducer) =>
    state.betaKeys.loading.delete;
export const selectBetaKeysLoadingPost = (state: Store.Reducer) =>
    state.betaKeys.loading.post;
export const selectBetaKeysStatus = (state: Store.Reducer) =>
    state.betaKeys.status;
export const selectCurrentBetaKey = createSelector(
    [betaKeysByIdSelector, betaKeysCurrentSelector],
    (betaKeysById, betaKeysCurrent) => {
        if (!betaKeysCurrent) return undefined;
        return betaKeysById[betaKeysCurrent];
    }
);
