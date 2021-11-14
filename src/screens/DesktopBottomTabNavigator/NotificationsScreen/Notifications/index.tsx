import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import {
    FlatList,
    InteractionManager,
    ListRenderItemInfo,
    RefreshControl,
    StatusBar,
    StyleProp,
    StyleSheet,
    useWindowDimensions,
    ViewStyle,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Animated from 'react-native-reanimated';

import { useTheme } from 'styled-components/native';
import { GLOBAL_STYLE } from '#helpers/constants';
import {
    getNotifications,
    refreshNotifications,
    selectNotificationsStatus,
} from '#store/notifications';

import RenderItem from './RenderItem';

type Props = {
    allIds: string[];
    scrollHandler: any;
};

const AnimatedFlatList = Animated.createAnimatedComponent<any>(FlatList);
const renderItem = ({ item }: ListRenderItemInfo<string>) => (
    <RenderItem item={item} />
);

const Notifications = ({ allIds, scrollHandler }: Props) => {
    const dimension = useWindowDimensions();
    const dispatch = useDispatch();
    const theme = useTheme();

    const status = useSelector(selectNotificationsStatus);

    const [refreshing, setRefreshing] = React.useState<boolean>(false);

    const colors = React.useMemo(
        () => [
            theme.colors.primary,
            theme.colors['primary-dark'],
            theme.colors['primary-light'],
        ],
        []
    );
    const styleProps = React.useMemo(
        () => ({
            minHeight: dimension.height + GLOBAL_STYLE.HEADER_TAB_HEIGHT,
        }),
        []
    );

    const handleEndReach = React.useCallback(() => {
        if (status.includes('LOADING') || status === 'REFRESH')
            InteractionManager.runAfterInteractions(() => {
                dispatch(getNotifications());
            });
    }, []);
    const handleRefresh = React.useCallback(() => {
        setRefreshing(true);
        if (status.includes('LOADING') || status === 'REFRESH') return;
        InteractionManager.runAfterInteractions(() => {
            dispatch(refreshNotifications());
        });
    }, [status]);
    const keyExtractor = React.useCallback((data: string) => data, []);

    useFocusEffect(
        React.useCallback(() => {
            if ((status === 'SUCCESS' || status === 'ERROR') && refreshing)
                setRefreshing(false);
        }, [status, refreshing])
    );

    return (
        <AnimatedFlatList
            contentContainerStyle={
                style(styleProps).animatedFlatListContentContainerStyle
            }
            data={allIds}
            extraData={allIds}
            initialNumToRender={3}
            keyExtractor={keyExtractor}
            maxToRenderPerBatch={3}
            onEndReached={handleEndReach}
            onEndReachedThreshold={0.2}
            onScroll={scrollHandler}
            refreshControl={
                <RefreshControl
                    colors={colors}
                    onRefresh={handleRefresh}
                    progressViewOffset={GLOBAL_STYLE.HEADER_TAB_HEIGHT}
                    progressBackgroundColor={theme.colors['secondary-light']}
                    refreshing={refreshing}
                />
            }
            removeClippedSubviews={true}
            renderItem={renderItem}
            scrollEventThrottle={4}
            showsVerticalScrollIndicator={false}
            updateCellsBatchingPeriod={1}
            windowSize={41}
        />
    );
};

const style: ({ minHeight }: { minHeight: number }) => {
    animatedFlatListContentContainerStyle: StyleProp<ViewStyle>;
} = StyleSheet.create(({ minHeight }) => ({
    animatedFlatListContentContainerStyle: {
        marginTop: StatusBar.currentHeight || 0,
        minHeight,
        paddingBottom: GLOBAL_STYLE.BOTTOM_TAB_HEIGHT + 30,
        paddingTop: GLOBAL_STYLE.HEADER_TAB_HEIGHT,
    },
}));

export default React.memo(Notifications);
