import { Dispatch } from 'redux';
import { updateNotificationsById } from '#store/notifications/actionCreators';

const successPutNotification = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    const { seen } = action.payload.data;
    if (typeof seen !== 'boolean') return;

    const notificationId = action.meta.query
        ? action.meta.query.notificationId
        : undefined;
    if (!notificationId) return;

    const notification = getState().notifications.byId[notificationId];
    if (!notification) return;

    dispatch(
        updateNotificationsById({
            ...notification,
            seen,
        })
    );
};

export default successPutNotification;
