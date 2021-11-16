import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BottomLoader, FullScreenLoader } from '#components';
import { BottomSheetContext } from '#contexts/BottomSheetContext';
import { putMeHasNewNotification, selectMe } from '#store/me';
import {
    getNotifications,
    resetNotificationsCurrent,
    selectNotificationsAllIds,
    selectNotificationsStatus,
} from '#store/notifications';

import EmptyScrollView from './EmptyScrollView';
import Notifications from './Notifications';

import { Container } from './styles';

const NotificationsScreen = () => {
    const dispatch = useDispatch();

    const { bottomSheetIsOpen } = React.useContext(BottomSheetContext);

    const me = useSelector(selectMe);
    const status = useSelector(selectNotificationsStatus);
    const allIds = useSelector(selectNotificationsAllIds);

    const showBottomLoader = React.useMemo(
        () => status === 'LOADING',
        [status]
    );
    const showFullScreenLoader = React.useMemo(
        () => status === 'PENDING' || status === 'INITIAL_LOADING',
        [status]
    );

    useFocusEffect(
        React.useCallback(() => {
            if (me && me.hasNewNotifications && status === 'SUCCESS') {
                dispatch(putMeHasNewNotification());
            }
        }, [me, status])
    );
    useFocusEffect(
        React.useCallback(() => {
            if (status === 'PENDING') dispatch(getNotifications());
        }, [status])
    );
    useFocusEffect(
        React.useCallback(() => {
            if (!bottomSheetIsOpen) dispatch(resetNotificationsCurrent());
        }, [bottomSheetIsOpen])
    );

    return (
        <Container>
            {allIds.length > 0 ? (
                <Notifications allIds={allIds} />
            ) : (
                <EmptyScrollView />
            )}
            <FullScreenLoader show={showFullScreenLoader} />
            <BottomLoader show={showBottomLoader} bottom="huge" />
        </Container>
    );
};

export default NotificationsScreen;
