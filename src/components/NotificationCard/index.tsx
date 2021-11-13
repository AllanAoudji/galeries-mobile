import * as React from 'react';

import NotificationBetakeyUsed from './NotificationBetaKeyUsed';
import NotificationCommentCommented from './NotificationCommentCommented';

type Props = {
    notification: Store.Models.Notification;
};

const NotificationCard = ({ notification }: Props) => {
    if (notification.type === 'BETA_KEY_USED')
        return <NotificationBetakeyUsed notification={notification} />;
    if (notification.type === 'COMMENT_COMMENTED')
        return <NotificationCommentCommented notification={notification} />;
    return null;
};

export default React.memo(NotificationCard);
