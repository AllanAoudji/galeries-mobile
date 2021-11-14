import {
    NOTIFICATIONS_ALL_IDS_REMOVE,
    NOTIFICATIONS_ALL_IDS_RESET,
    NOTIFICATIONS_ALL_IDS_SET,
    NOTIFICATIONS_BY_ID_REMOVE,
    NOTIFICATIONS_BY_ID_RESET,
    NOTIFICATIONS_BY_ID_SET,
    NOTIFICATIONS_BY_ID_UPDATE,
    NOTIFICATIONS_DELETE,
    NOTIFICATIONS_END_RESET,
    NOTIFICATIONS_END_UPDATE,
    NOTIFICATIONS_GET,
    NOTIFICATIONS_LOADING_DELETE_RESET,
    NOTIFICATIONS_LOADING_DELETE_UPDATE,
    NOTIFICATIONS_PREVIOUS_RESET,
    NOTIFICATIONS_PREVIOUS_UPDATE,
    NOTIFICATIONS_PUT,
    NOTIFICATIONS_REFETCH,
    NOTIFICATIONS_RESET,
    NOTIFICATIONS_STATUS_RESET,
    NOTIFICATIONS_STATUS_UPDATE,
} from '#store/notifications/actionTypes';

export const deleteNotification: (notificationId: string) => Store.Action = (
    notificationId
) => ({
    meta: { query: { notificationId } },
    payload: notificationId,
    type: NOTIFICATIONS_DELETE,
});
export const getNotificationId: (notificationId: string) => Store.Action = (
    notificationId
) => ({
    meta: { query: { notificationId } },
    payload: {},
    type: NOTIFICATIONS_GET,
});
export const getNotifications: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: NOTIFICATIONS_GET,
});
export const putNotification: (notificationId: string) => Store.Action = (
    notificationId
) => ({
    meta: { query: { notificationId } },
    payload: notificationId,
    type: NOTIFICATIONS_PUT,
});
export const refreshNotifications: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: NOTIFICATIONS_REFETCH,
});
export const removeNotificationsAllIds: (payload: string) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: NOTIFICATIONS_ALL_IDS_REMOVE,
});
export const removeNotificationsById: (payload: string) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: NOTIFICATIONS_BY_ID_REMOVE,
});
export const resetNotifications: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: NOTIFICATIONS_RESET,
});
export const resetNotificationsAllIds: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: NOTIFICATIONS_ALL_IDS_RESET,
});
export const resetNotificationsById: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: NOTIFICATIONS_BY_ID_RESET,
});
export const resetNotificationsEnd: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: NOTIFICATIONS_END_RESET,
});
export const resetNotificationsLoadingDelete: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: NOTIFICATIONS_LOADING_DELETE_RESET,
});
export const resetNotificationsPrevious: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: NOTIFICATIONS_PREVIOUS_RESET,
});
export const resetNotificationsStatus: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: NOTIFICATIONS_STATUS_RESET,
});
export const setNotificationsAllIds: (payload: string[]) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: NOTIFICATIONS_ALL_IDS_SET,
});
export const setNotificationsById: (payload: {
    [key: string]: Store.Models.Notification;
}) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: NOTIFICATIONS_BY_ID_SET,
});
export const updateNotificationsById: (
    payload: Store.Models.Notification
) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: NOTIFICATIONS_BY_ID_UPDATE,
});
export const updateNotificationsEnd: (payload: boolean) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: NOTIFICATIONS_END_UPDATE,
});
export const updateNotificationsLoadingDelete: (
    payload: Store.Status
) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: NOTIFICATIONS_LOADING_DELETE_UPDATE,
});
export const updateNotificationsPrevious: (payload: string) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: NOTIFICATIONS_PREVIOUS_UPDATE,
});
export const updateNotificationsStatus: (
    payload: Store.Status
) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: NOTIFICATIONS_STATUS_UPDATE,
});
