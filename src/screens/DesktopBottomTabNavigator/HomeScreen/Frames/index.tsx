import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import {
    FlatList,
    InteractionManager,
    ListRenderItemInfo,
    RefreshControl,
    StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { useTheme } from 'styled-components/native';
import { GLOBAL_STYLE } from '#helpers/constants';
import { getFrames, refreshFrames, selectFramesStatus } from '#store/frames';

import RenderItem from './RenderItem';

type Props = {
    allIds: string[];
};

const renderItem = ({ item }: ListRenderItemInfo<string>) => (
    <RenderItem item={item} />
);

const Frames = ({ allIds }: Props) => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const status = useSelector(selectFramesStatus);

    const [refreshing, setRefreshing] = React.useState<boolean>(false);

    const colors = React.useMemo(
        () => [
            theme.colors.primary,
            theme.colors['primary-dark'],
            theme.colors['primary-light'],
        ],
        []
    );

    const handleEndReach = React.useCallback(() => {
        if (status.includes('LOADING') || status === 'REFRESH')
            InteractionManager.runAfterInteractions(() => {
                dispatch(getFrames());
            });
    }, []);
    const handleRefresh = React.useCallback(() => {
        setRefreshing(true);
        if (status.includes('LOADING') || status === 'REFRESH') return;
        InteractionManager.runAfterInteractions(() => {
            dispatch(refreshFrames());
        });
    }, [status]);
    const keyExtractor = React.useCallback((data: string) => data, []);

    useFocusEffect(
        React.useCallback(() => {
            if (status === 'SUCCESS' && refreshing) setRefreshing(false);
        }, [status, refreshing])
    );

    return (
        <FlatList
            contentContainerStyle={style.animatedFlatListContentContainerStyle}
            data={allIds}
            extraData={allIds}
            initialNumToRender={3}
            keyExtractor={keyExtractor}
            maxToRenderPerBatch={3}
            onEndReached={handleEndReach}
            onEndReachedThreshold={0.2}
            overScrollMode="never"
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

const style = StyleSheet.create({
    animatedFlatListContentContainerStyle: {
        paddingBottom: GLOBAL_STYLE.BOTTOM_TAB_HEIGHT + 30,
    },
});

export default Frames;
