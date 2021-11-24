import { createSelector } from 'reselect';

const selectUsersById = (state: Store.Reducer) => state.users.byId;

export const selectMeFieldsError = (state: Store.Reducer) =>
    state.me.fieldsError;
export const selectMeId = (state: Store.Reducer) => state.me.id;
export const selectMeLoadingDelete = (state: Store.Reducer) =>
    state.me.loading.delete;
export const selectMeLoadingPut = (state: Store.Reducer) =>
    state.me.loading.put;
export const selectMeStatus = (state: Store.Reducer) => state.me.status;
export const selectMe = createSelector(
    [selectUsersById, selectMeId],
    (byId, id) => {
        if (!id) return undefined;
        return byId[id];
    }
);
