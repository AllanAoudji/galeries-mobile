import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Typography } from '#components';
import { putMeHasNewNotification, selectMe } from '#store/me';
import {
    getNotifications,
    selectNotificationsStatus,
} from '#store/notifications';

const NotificationsScreen = () => {
    const dispatch = useDispatch();

    const me = useSelector(selectMe);
    const status = useSelector(selectNotificationsStatus);

    useFocusEffect(
        React.useCallback(() => {
            if (me && me.hasNewNotifications) {
                dispatch(putMeHasNewNotification());
            }
        }, [me])
    );
    useFocusEffect(
        React.useCallback(() => {
            if (status === 'PENDING') dispatch(getNotifications());
        }, [status])
    );

    return <Typography>Notifications</Typography>;
};

export default NotificationsScreen;
