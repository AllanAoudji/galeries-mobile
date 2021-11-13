import { createSelector } from 'reselect';

const notificationsByIdSelector = (state: Store.Reducer) =>
    state.notifications.byId;

export const selectNotification = (notificationId?: string | null) =>
    createSelector([notificationsByIdSelector], (notificationsById) => {
        if (!notificationId) return undefined;
        return notificationsById[notificationId];
    });
export const selectNotificationsAllIds = (state: Store.Reducer) =>
    state.notifications.allIds;
export const selectNotificationsStatus = (state: Store.Reducer) =>
    state.notifications.status;
export const selectNotificationsLoadingDelete = (state: Store.Reducer) =>
    state.notifications.loading.delete;
