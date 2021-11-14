import * as React from 'react';

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
    if (notification.type === 'BETA_KEY_USED')
        return <NotificationBetakeyUsed notification={notification} />;
    if (notification.type === 'COMMENT_COMMENTED')
        return <NotificationCommentCommented notification={notification} />;
    if (notification.type === 'FRAME_COMMENTED')
        return <NotificationFrameCommented notification={notification} />;
    if (notification.type === 'FRAME_LIKED')
        return <NotificationFrameLiked notification={notification} />;
    if (notification.type === 'FRAME_POSTED')
        return <NotificationFramePosted notification={notification} />;
    if (notification.type === 'GALERIE_ROLE_CHANGE')
        return <NotificationGalerieRoleChange notification={notification} />;
    if (notification.type === 'ROLE_CHANGE')
        return <NotificationRoleChange notification={notification} />;
    if (notification.type === 'USER_SUBSCRIBE')
        return <NotificationUserSubsribe notification={notification} />;
    return null;
};

export default React.memo(NotificationCard);
