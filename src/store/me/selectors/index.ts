import { createSelector } from 'reselect';

const selectMeId = (state: Store.Reducer) => state.me.id;
const selectUsersById = (state: Store.Reducer) => state.users.byId;

export const selectMeStatus = (state: Store.Reducer) => state.me.status;
export const selectMe = createSelector(
    [selectUsersById, selectMeId],
    (byId, id) => {
        if (!id) return undefined;
        return byId[id];
    }
);
