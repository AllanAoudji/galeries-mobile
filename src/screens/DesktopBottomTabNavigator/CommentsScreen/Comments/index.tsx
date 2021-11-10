import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import {
    FlatList,
    InteractionManager,
    Keyboard,
    ListRenderItemInfo,
    RefreshControl,
    StatusBar,
    StyleProp,
    StyleSheet,
    useWindowDimensions,
    ViewStyle,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components/native';

import { GLOBAL_STYLE } from '#helpers/constants';
import {
    getFrameComments,
    refreshFrameComments,
    selectFrameCommentsStatus,
} from '#store/comments';

import RenderItem from './RenderItem';

type CommentsProps = {
    allIds: string[];
    flatListRef: React.MutableRefObject<FlatList<any> | null>;
    frameId: string;
    scrollHandler: any;
};

const AnimatedFlatList = Animated.createAnimatedComponent<any>(FlatList);
const renderItem = ({ item }: ListRenderItemInfo<string>) => (
    <RenderItem item={item} />
);

const Comments = ({
    allIds,
    flatListRef,
    frameId,
    scrollHandler,
}: CommentsProps) => {
    const dimension = useWindowDimensions();
    const dispatch = useDispatch();
    const theme = useTheme();

    const statusSelector = React.useMemo(
        () => selectFrameCommentsStatus(frameId),
        [frameId]
    );
    const status = useSelector(statusSelector);

    const [refreshing, setRefreshing] = React.useState<boolean>(false);

    const colors = React.useMemo(
        () => [
            theme.colors.primary,
            theme.colors['primary-dark'],
            theme.colors['primary-light'],
        ],
        [theme]
    );
    const styleProps = React.useMemo(
        () => ({
            minHeight: dimension.height + GLOBAL_STYLE.HEADER_TAB_HEIGHT,
        }),
        [dimension]
    );

    const handleEndReach = React.useCallback(
        () =>
            InteractionManager.runAfterInteractions(() => {
                dispatch(getFrameComments(frameId));
            }),
        []
    );
    const handleRefresh = React.useCallback(() => {
        setRefreshing(true);
        if (!status || status.includes('LOADING') || status === 'REFRESH')
            return;
        InteractionManager.runAfterInteractions(() => {
            dispatch(refreshFrameComments(frameId));
        });
    }, [frameId]);
    const handleScrollBeginDrag = React.useCallback(
        () => Keyboard.dismiss(),
        []
    );
    const keyExtractor = React.useCallback((data: string) => data, []);

    useFocusEffect(
        React.useCallback(() => {
            if (status === 'SUCCESS' && refreshing) setRefreshing(false);
        }, [status, refreshing])
    );

    return (
        <AnimatedFlatList
            contentContainerStyle={
                style(styleProps).animatedFlatListContentContainerStyle
            }
            data={allIds}
            extraData={allIds}
            initialNumToRender={15}
            keyExtractor={keyExtractor}
            maxToRenderPerBatch={15}
            onEndReached={handleEndReach}
            onEndReachedThreshold={0.2}
            onScroll={scrollHandler}
            onScrollBeginDrag={handleScrollBeginDrag}
            ref={flatListRef}
            refreshControl={
                <RefreshControl
                    colors={colors}
                    onRefresh={handleRefresh}
                    progressViewOffset={GLOBAL_STYLE.HEADER_TAB_HEIGHT}
                    progressBackgroundColor={theme.colors['secondary-light']}
                    refreshing={refreshing}
                />
            }
            removeClippedSubviews
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
        paddingBottom: GLOBAL_STYLE.COMMENTS_FOOTER_HEIGHT,
        paddingTop: GLOBAL_STYLE.HEADER_TAB_HEIGHT,
    },
}));

export default Comments;
