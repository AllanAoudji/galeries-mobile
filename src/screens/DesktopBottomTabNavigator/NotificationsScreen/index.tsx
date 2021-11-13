import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Typography } from '#components';
import { putMeHasNewNotification, selectMe } from '#store/me';

const NotificationsScreen = () => {
    const dispatch = useDispatch();

    const me = useSelector(selectMe);

    useFocusEffect(
        React.useCallback(() => {
            if (me && me.hasNewNotifications) {
                dispatch(putMeHasNewNotification());
            }
        }, [me])
    );

    return <Typography>Notifications</Typography>;
};

export default NotificationsScreen;
