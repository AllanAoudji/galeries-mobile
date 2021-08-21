export const NOTIFICATION: Store.Entity = '[NOTIFICATION]';

export const NOTIFICATION_SET = `${NOTIFICATION} Set`;

export const resetNotification: () => Store.Action = () => ({
    payload: {
        data: {},
        meta: {},
    },
    type: NOTIFICATION_SET,
});

export const setNotification: (
    data: Store.Models.Notification
) => Store.Action = (data) => ({
    payload: {
        data,
        meta: {},
    },
    type: NOTIFICATION_SET,
});
