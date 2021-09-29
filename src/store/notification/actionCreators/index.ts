import {
    NOTIFICATION_RESET,
    NOTIFICATION_UPDATE,
} from '#store/notification/actionTypes';

export const resetNotification: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: NOTIFICATION_RESET,
});
export const updateNotification: (payload: {
    status: 'error' | 'success';
    text: string;
}) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: NOTIFICATION_UPDATE,
});
