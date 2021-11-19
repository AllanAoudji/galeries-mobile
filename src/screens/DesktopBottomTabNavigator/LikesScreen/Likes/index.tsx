import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import {
    FlatList,
    ListRenderItemInfo,
    RefreshControl,
    StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components/native';

import { GLOBAL_STYLE } from '#helpers/constants';
import { useHideHeaderOnScroll } from '#hooks';
import {
    getFrameLikes,
    refreshFrameLikes,
    selectCurrentFrameLikesStatus,
} from '#store/likes';

import RenderItem from './RenderItem';

type Props = {
    allIds?: string[];
    frameId: string;
};

const renderItem = ({ index, item }: ListRenderItemInfo<string>) => {
    return <RenderItem index={index} item={item} />;
};

const Likes = ({ allIds, frameId }: Props) => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const { scrollHandler } = useHideHeaderOnScroll(
        GLOBAL_STYLE.HEADER_TAB_HEIGHT
    );

    const status = useSelector(selectCurrentFrameLikesStatus);

    const [refreshing, setRefreshing] = React.useState<boolean>(false);

    const colors = React.useMemo(
        () => [
            theme.colors.primary,
            theme.colors['primary-dark'],
            theme.colors['primary-light'],
        ],
        [theme]
    );

    const handleEndReach = React.useCallback(() => {
        if (status && !status.includes('LOADING') && status !== 'REFRESH')
            dispatch(getFrameLikes(frameId));
    }, [frameId, status]);
    const handleRefresh = React.useCallback(() => {
        setRefreshing(true);
        if (status && !status.includes('LOADING') && status !== 'REFRESH')
            dispatch(refreshFrameLikes(frameId));
    }, [frameId, status]);
    const getItemLayout = React.useCallback(
        (_, index) => ({
            length: GLOBAL_STYLE.USER_CARD_HEIGHT,
            offset: GLOBAL_STYLE.USER_CARD_HEIGHT * index,
            index,
        }),
        []
    );
    const keyExtractor = React.useCallback((item: string) => item, []);

    useFocusEffect(
        React.useCallback(() => {
            if (status === 'SUCCESS' && refreshing) setRefreshing(false);
        }, [status, refreshing])
    );

    useFocusEffect(
        React.useCallback(() => {
            if (!status || status === 'PENDING')
                dispatch(getFrameLikes(frameId));
        }, [frameId, status])
    );

    if (!allIds) return null;

    return (
        <FlatList
            contentContainerStyle={style.animatedFlatListContentContainerStyle}
            data={allIds}
            extraData={allIds}
            getItemLayout={getItemLayout}
            initialNumToRender={10}
            keyExtractor={keyExtractor}
            maxToRenderPerBatch={3}
            onEndReached={handleEndReach}
            onEndReachedThreshold={0.2}
            onScroll={scrollHandler}
            refreshControl={
                <RefreshControl
                    colors={colors}
                    onRefresh={handleRefresh}
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

const style = StyleSheet.create({
    animatedFlatListContentContainerStyle: {
        paddingBottom: GLOBAL_STYLE.BOTTOM_TAB_HEIGHT + 30,
    },
});

export default Likes;
