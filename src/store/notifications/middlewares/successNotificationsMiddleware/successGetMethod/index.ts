import { Dispatch } from 'redux';
import {
    setNotificationsAllIds,
    setNotificationsById,
    updateNotificationsEnd,
    updateNotificationsPrevious,
    updateNotificationsStatus,
} from '#store/notifications/actionCreators';
import { combineNotificationsAllIds } from '#store/combineAllIds';
import {
    getComment,
    getNotificationComments,
} from '#store/comments/actionCreators';
import { getFrame, getNotificationFrames } from '#store/frames/actionCreators';
import { getGalerieId } from '#store/galeries/actionCreators';
import { getNotificationUsers } from '#store/users/actionCreators';

const successGetMethod = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    if (typeof action.payload.data !== 'object') {
        dispatch(updateNotificationsStatus('ERROR'));
        return;
    }

    const allIds: string[] = [];
    const byId: { [key: string]: Store.Models.Notification } = {};
    const { notification, notifications } = action.payload.data;
    if (notifications && Array.isArray(notifications))
        notifications.forEach((n: Store.Models.Notification) => {
            allIds.push(n.id);
            byId[n.id] = n;
        });
    else if (notification && typeof notification === 'object') {
        allIds.push(notification.id);
        byId[notification.id] = notification;
    }

    dispatch(setNotificationsById(byId));

    const previousNotificationId =
        allIds.length > 0 ? allIds[allIds.length - 1] : undefined;
    const previous = previousNotificationId
        ? byId[previousNotificationId].autoIncrementId
        : undefined;

    if (notification === undefined) {
        let oldsAllIds: string[];
        if (action.meta.refresh) oldsAllIds = [];
        else oldsAllIds = getState().notifications.allIds || [];
        const newAllIds = combineNotificationsAllIds(
            getState,
            oldsAllIds,
            allIds
        );
        dispatch(setNotificationsAllIds(newAllIds));
        dispatch(updateNotificationsEnd(allIds.length < 20));
        if (previous) dispatch(updateNotificationsPrevious(previous));
    }

    dispatch(updateNotificationsStatus('SUCCESS'));

    allIds.forEach((id) => {
        if (!byId[id]) return;
        if (
            byId[id].type === 'COMMENT_COMMENTED' ||
            byId[id].type === 'FRAME_COMMENTED'
        ) {
            const commentsStatus = getState().comments.status[id];
            if (commentsStatus === 'PENDING' || action.meta.refresh)
                dispatch(getNotificationComments(id));
        }
        if (
            byId[id].type === 'BETA_KEY_USED' ||
            byId[id].type === 'FRAME_LIKED' ||
            byId[id].type === 'USER_SUBSCRIBE'
        ) {
            const usersStatus = getState().users.status[id] || 'PENDING';
            if (usersStatus === 'PENDING' || action.meta.refresh)
                dispatch(getNotificationUsers(id));
        }
        if (byId[id].type === 'FRAME_POSTED') {
            const frameStatus = getState().frames.status[id] || 'PENDING';
            if (frameStatus === 'PENDING' || action.meta.refresh)
                dispatch(getNotificationFrames(id));
        }

        const { commentId, frameId, galerieId } = byId[id];
        if (commentId) dispatch(getComment(commentId));
        if (frameId) dispatch(getFrame(frameId));
        if (galerieId) dispatch(getGalerieId(galerieId));
    });
};

export default successGetMethod;
