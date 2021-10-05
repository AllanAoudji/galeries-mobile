import { createSelector } from 'reselect';

const selectUsersById = (state: Store.Reducer) => state.users.byId;

export const selectMeId = (state: Store.Reducer) => state.me.id;
export const selectMeStatus = (state: Store.Reducer) => state.me.status;
export const selectMe = createSelector(
    [selectUsersById, selectMeId],
    (byId, id) => {
        if (!id) return undefined;
        return byId[id];
    }
);
