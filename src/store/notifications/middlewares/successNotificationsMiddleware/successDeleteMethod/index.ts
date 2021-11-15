import { Dispatch } from 'redux';

import {
    removeNotificationsAllIds,
    removeNotificationsById,
    updateNotificationsLoadingDelete,
} from '#store/notifications/actionCreators';

const successDeleteNotification = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    if (typeof action.payload.data !== 'object') {
        dispatch(updateNotificationsLoadingDelete('ERROR'));
        return;
    }

    const { notificationId } = action.payload.data;
    if (typeof notificationId !== 'string') {
        dispatch(updateNotificationsLoadingDelete('ERROR'));
        return;
    }
    const notification = getState().notifications.byId[notificationId];
    if (!notification) {
        dispatch(updateNotificationsLoadingDelete('ERROR'));
        return;
    }

    dispatch(removeNotificationsAllIds(notificationId));
    dispatch(removeNotificationsById(notificationId));
    dispatch(updateNotificationsLoadingDelete('SUCCESS'));
};

export default successDeleteNotification;
