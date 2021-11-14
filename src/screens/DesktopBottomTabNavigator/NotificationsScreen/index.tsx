import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { BottomLoader, DefaultHeader, FullScreenLoader } from '#components';
import { GLOBAL_STYLE } from '#helpers/constants';
import { useHideHeaderOnScroll } from '#hooks';
import { putMeHasNewNotification, selectMe } from '#store/me';
import {
    getNotifications,
    selectNotificationsAllIds,
    selectNotificationsStatus,
} from '#store/notifications';

import EmptyScrollView from './EmptyScrollView';
import Notifications from './Notifications';

import { Container, Header } from './styles';

const NotificationsScreen = () => {
    const dispatch = useDispatch();
    const dimension = useWindowDimensions();

    const { containerStyle, scrollHandler } = useHideHeaderOnScroll(
        GLOBAL_STYLE.HEADER_TAB_HEIGHT
    );

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

    return (
        <Container>
            <Header style={containerStyle} width={dimension.width}>
                <DefaultHeader title="notifications" />
            </Header>
            {allIds.length > 0 ? (
                <Notifications allIds={allIds} scrollHandler={scrollHandler} />
            ) : (
                <EmptyScrollView scrollHandler={scrollHandler} />
            )}
            <FullScreenLoader show={showFullScreenLoader} />
            <BottomLoader show={showBottomLoader} bottom="huge" />
        </Container>
    );
};

export default NotificationsScreen;
