import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import {
    FlatList,
    ListRenderItemInfo,
    RefreshControl,
    StyleProp,
    StyleSheet,
    ViewStyle,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Animated from 'react-native-reanimated';

import { useTheme } from 'styled-components/native';
import { GLOBAL_STYLE } from '#helpers/constants';
import { getFrames, refreshFrames, selectFramesStatus } from '#store/frames';

import RenderItem from './RenderItem';

type Props = {
    allIds: string[];
    scrollHandler: any;
};

const AnimatedFlatList = Animated.createAnimatedComponent<any>(FlatList);
const renderItem = ({ item }: ListRenderItemInfo<string>) => (
    <RenderItem item={item} />
);

const Frames = ({ allIds, scrollHandler }: Props) => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const loading = useSelector(selectFramesStatus);

    const [refreshing, setRefreshing] = React.useState<boolean>(false);

    const colors = React.useMemo(
        () => [
            theme.colors.primary,
            theme.colors['primary-dark'],
            theme.colors['primary-light'],
        ],
        []
    );

    const handleEndReach = React.useCallback(() => dispatch(getFrames()), []);
    const handleRefresh = React.useCallback(() => {
        setRefreshing(true);
        dispatch(refreshFrames());
    }, []);
    const keyExtractor = React.useCallback((data: string) => data, []);

    useFocusEffect(
        React.useCallback(() => {
            if (loading === 'SUCCESS' && refreshing) setRefreshing(false);
        }, [loading, refreshing])
    );

    return (
        <AnimatedFlatList
            contentContainerStyle={
                style().animatedFlatListContentContainerStyle
            }
            data={allIds}
            style={{ flex: 1 }}
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
            renderItem={renderItem}
            scrollEventThrottle={4}
            showsVerticalScrollIndicator={false}
            updateCellsBatchingPeriod={1}
            windowSize={41}
        />
    );
};

const style: () => {
    animatedFlatListContentContainerStyle: StyleProp<ViewStyle>;
} = StyleSheet.create(() => ({
    animatedFlatListContentContainerStyle: {
        paddingBottom: GLOBAL_STYLE.BOTTOM_TAB_HEIGHT,
        paddingTop: GLOBAL_STYLE.HEADER_TAB_HEIGHT,
    },
}));

export default Frames;
