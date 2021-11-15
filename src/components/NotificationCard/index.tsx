import * as React from 'react';
import { useDispatch } from 'react-redux';

import { BottomSheetContext } from '#contexts/BottomSheetContext';
import { updateNotificationsCurrent } from '#store/notifications';

import DeleteNotificationButton from './DeleteNotificationButton';
import MarkAsSeenButton from './MarkAsSeenButton';
import NotificationBetakeyUsed from './NotificationBetaKeyUsed';
import NotificationCommentCommented from './NotificationCommentCommented';
import NotificationFrameCommented from './NotificationFrameCommented';
import NotificationFrameLiked from './NotificationFrameLiked';
import NotificationFramePosted from './NotificationFramePosted';
import NotificationGalerieRoleChange from './NotificationGalerieRoleChange';
import NotificationRoleChange from './NotificationRoleChange';
import NotificationUserSubsribe from './NotificationUserSubsribe';

type Props = {
    notification: Store.Models.Notification;
};

const NotificationCard = ({ notification }: Props) => {
    const dispatch = useDispatch();

    const { openBottomSheet } = React.useContext(BottomSheetContext);

    const bottomSheetContent = React.useCallback(() => {
        return (
            <>
                <DeleteNotificationButton notification={notification} />
                <MarkAsSeenButton notification={notification} />
            </>
        );
    }, [notification]);

    const handleLongPress = React.useCallback(() => {
        dispatch(updateNotificationsCurrent(notification.id));
        openBottomSheet(bottomSheetContent);
    }, [bottomSheetContent, notification, openBottomSheet]);

    if (notification.type === 'BETA_KEY_USED')
        return (
            <NotificationBetakeyUsed
                notification={notification}
                onLongPress={handleLongPress}
            />
        );
    if (notification.type === 'COMMENT_COMMENTED')
        return (
            <NotificationCommentCommented
                notification={notification}
                onLongPress={handleLongPress}
            />
        );
    if (notification.type === 'FRAME_COMMENTED')
        return (
            <NotificationFrameCommented
                notification={notification}
                onLongPress={handleLongPress}
            />
        );
    if (notification.type === 'FRAME_LIKED')
        return (
            <NotificationFrameLiked
                notification={notification}
                onLongPress={handleLongPress}
            />
        );
    if (notification.type === 'FRAME_POSTED')
        return (
            <NotificationFramePosted
                notification={notification}
                onLongPress={handleLongPress}
            />
        );
    if (notification.type === 'GALERIE_ROLE_CHANGE')
        return (
            <NotificationGalerieRoleChange
                notification={notification}
                onLongPress={handleLongPress}
            />
        );
    if (notification.type === 'ROLE_CHANGE')
        return (
            <NotificationRoleChange
                notification={notification}
                onLongPress={handleLongPress}
            />
        );
    if (notification.type === 'USER_SUBSCRIBE')
        return (
            <NotificationUserSubsribe
                notification={notification}
                onLongPress={handleLongPress}
            />
        );
    return null;
};

export default React.memo(NotificationCard);
