import { createSelector, OutputSelector } from 'reselect';

const galeriesCurrentSelector = (state: Store.Reducer) =>
    state.galeries.current;
const usersByIdSelector = (state: Store.Reducer) => state.users.byId;
const usersAllIdsSelector = (state: Store.Reducer) => state.users.allIds;
const usersStatusSelector = (state: Store.Reducer) => state.users.status;

export const selectUsersCurrent = (state: Store.Reducer) => state.users.current;

export const selectCurrentGalerieUsersAllIds = createSelector(
    [galeriesCurrentSelector, usersAllIdsSelector],
    (galeriesCurrent, usersAllIds) => {
        if (!galeriesCurrent) return undefined;
        return usersAllIds[galeriesCurrent];
    }
);
export const selectCurrentGalerieUsersStatus = createSelector(
    [galeriesCurrentSelector, usersStatusSelector],
    (galeriesCurrent, usersStatus) => {
        if (!galeriesCurrent) return undefined;
        return usersStatus[galeriesCurrent];
    }
);
export const selectGalerieUsersAllIds = (galerieId?: string) =>
    createSelector([usersAllIdsSelector], (usersAllIds) => {
        if (!galerieId) return undefined;
        return usersAllIds[galerieId] || [];
    });
export const selectGalerieUsersStatus: (
    galerieId: string
) => OutputSelector<
    Store.Reducer,
    Store.Status,
    (res: { [key: string]: Store.Status }) => Store.Status | undefined
> = (galerieId: string) =>
    createSelector(
        [usersStatusSelector],
        (usersStatus) => usersStatus[galerieId] || 'PENDING'
    );
export const selectUser = (userId?: string | null) =>
    createSelector([usersByIdSelector], (usersById) => {
        if (!userId) return undefined;
        return usersById[userId];
    });
export const selectUsersAllIds = createSelector(
    [usersAllIdsSelector],
    (usersAllIds) => usersAllIds[''] || []
);
export const selectUsersStatus = createSelector(
    [usersStatusSelector],
    (usersStatus) => usersStatus[''] || 'PENDING'
);
