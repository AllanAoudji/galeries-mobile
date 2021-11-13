import { createSelector, OutputSelector } from 'reselect';

const galeriesCurrentSelector = (state: Store.Reducer) =>
    state.galeries.current;
const usersByIdSelector = (state: Store.Reducer) => state.users.byId;
const usersCurrentSelector = (state: Store.Reducer) => state.users.current;
const usersAllIdsSelector = (state: Store.Reducer) => state.users.allIds;
const usersStatusSelector = (state: Store.Reducer) => state.users.status;

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
export const selectCurrentUser = createSelector(
    [usersByIdSelector, usersCurrentSelector],
    (usersById, usersCurrent) =>
        usersCurrent ? usersById[usersCurrent] : undefined
);
export const selectGalerieUsersAllIds = (galerieId?: string) =>
    createSelector([usersAllIdsSelector], (usersAllIds) => {
        if (!galerieId) return undefined;
        return usersAllIds[galerieId] || [];
    });
export const selectNotificationUsersAllIds = (notificationId?: string) =>
    createSelector([usersAllIdsSelector], (usersAllIds) => {
        if (!notificationId) return undefined;
        return usersAllIds[notificationId] || [];
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
export const selectUsersLoadingDelete = (state: Store.Reducer) =>
    state.users.loading.delete;
