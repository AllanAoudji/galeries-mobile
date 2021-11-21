import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { ListRenderItemInfo, useWindowDimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
    BottomLoader,
    CustomFlatList,
    EmptyMessage,
    FullScreenContainer,
    FullScreenLoader,
} from '#components';
import { BottomSheetContext } from '#contexts/BottomSheetContext';
import { GLOBAL_STYLE } from '#helpers/constants';
import { putMeHasNewNotification, selectMe } from '#store/me';
import {
    getNotifications,
    refreshNotifications,
    resetNotificationsCurrent,
    selectCurrentNotifications,
    selectNotificationsAllIds,
    selectNotificationsStatus,
} from '#store/notifications';

import RenderItem from './RenderItem';

const renderItem = ({ item }: ListRenderItemInfo<string>) => (
    <RenderItem item={item} />
);

const NotificationsScreen = () => {
    const dimension = useWindowDimensions();
    const dispatch = useDispatch();

    const { bottomSheetIsOpen } = React.useContext(BottomSheetContext);

    const allIds = useSelector(selectNotificationsAllIds);
    const currentNotification = useSelector(selectCurrentNotifications);
    const me = useSelector(selectMe);
    const status = useSelector(selectNotificationsStatus);

    const showBottomLoader = React.useMemo(
        () => status === 'LOADING',
        [status]
    );
    const showFullScreenLoader = React.useMemo(
        () => status === 'PENDING' || status === 'INITIAL_LOADING',
        [status]
    );

    const getItemLayout = React.useCallback(
        (_, index) => ({
            length: GLOBAL_STYLE.NOTIFICATION_CARD_HEIGHT,
            offset: GLOBAL_STYLE.NOTIFICATION_CARD_HEIGHT * index,
            index,
        }),
        []
    );
    const handleEndReach = React.useCallback(() => {
        if (status.includes('LOADING')) return;
        if (status === 'REFRESH') return;
        dispatch(getNotifications());
    }, []);
    const handleRefresh = React.useCallback(() => {
        if (status.includes('LOADING')) return;
        if (status === 'REFRESH') return;
        dispatch(refreshNotifications());
    }, [status]);

    useFocusEffect(
        React.useCallback(() => {
            if (!me) return;
            if (!me.hasNewNotifications) return;
            if (status !== 'SUCCESS') return;
            dispatch(putMeHasNewNotification());
        }, [me, status])
    );
    useFocusEffect(
        React.useCallback(() => {
            if (status !== 'PENDING') return;
            dispatch(getNotifications());
        }, [status])
    );
    useFocusEffect(
        React.useCallback(() => {
            if (bottomSheetIsOpen) return;
            if (!currentNotification) return;
            dispatch(resetNotificationsCurrent());
        }, [bottomSheetIsOpen, currentNotification])
    );

    return (
        <FullScreenContainer>
            {allIds.length > 0 ? (
                <CustomFlatList
                    allIds={allIds}
                    getItemLayout={getItemLayout}
                    onRefresh={handleRefresh}
                    onEndReach={handleEndReach}
                    pb={GLOBAL_STYLE.BOTTOM_TAB_HEIGHT}
                    renderItem={renderItem}
                    status={status}
                />
            ) : (
                <EmptyMessage
                    height={dimension.height - GLOBAL_STYLE.HEADER_TAB_HEIGHT}
                    onRefresh={handleRefresh}
                    refreshStatus={status}
                    text="you don't have any notification yet"
                />
            )}
            <FullScreenLoader show={showFullScreenLoader} />
            <BottomLoader bottom="huge" show={showBottomLoader} />
        </FullScreenContainer>
    );
};

export default NotificationsScreen;
