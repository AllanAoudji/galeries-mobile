import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import {
    FlatList,
    InteractionManager,
    Keyboard,
    ListRenderItemInfo,
    RefreshControl,
    StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components/native';

import { GLOBAL_STYLE } from '#helpers/constants';
import {
    getGaleries,
    refreshGaleries,
    selectGaleriesFilterName,
    selectGaleriesNameStatus,
} from '#store/galeries';

import RenderItem from './RenderItem';

type Props = {
    allIds: string[];
};

const renderItem = ({ item }: ListRenderItemInfo<string>) => (
    <RenderItem item={item} />
);

const Galeries = ({ allIds }: Props) => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const filterGaleriesName = useSelector(selectGaleriesFilterName);
    const status = useSelector(selectGaleriesNameStatus);

    const [refreshing, setRefreshing] = React.useState<boolean>(false);

    const colors = React.useMemo(
        () => [
            theme.colors.primary,
            theme.colors['primary-dark'],
            theme.colors['primary-light'],
        ],
        []
    );

    const handleEndReached = React.useCallback(() => {
        if (status.includes('LOADING') || status === 'REFRESH') return;
        InteractionManager.runAfterInteractions(() => {
            dispatch(getGaleries(filterGaleriesName));
        });
    }, [filterGaleriesName, status]);
    const handleRefresh = React.useCallback(() => {
        setRefreshing(true);
        if (status.includes('LOADING') || status === 'REFRESH') return;
        InteractionManager.runAfterInteractions(() => {
            dispatch(refreshGaleries(filterGaleriesName));
        });
    }, [filterGaleriesName, status]);
    const handleScrollBeginDrag = React.useCallback(
        () => Keyboard.dismiss(),
        []
    );
    const getItemLayout = React.useCallback(
        (_, index) => ({
            length: GLOBAL_STYLE.GALERIE_CARD_HEIGHT,
            offset: GLOBAL_STYLE.GALERIE_CARD_HEIGHT * index,
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

    return (
        <FlatList
            contentContainerStyle={style.animatedFlatListContentContainerStyle}
            data={allIds}
            extraData={allIds}
            getItemLayout={getItemLayout}
            initialNumToRender={5}
            keyExtractor={keyExtractor}
            keyboardShouldPersistTaps="handled"
            maxToRenderPerBatch={4}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.2}
            overScrollMode="never"
            onScrollBeginDrag={handleScrollBeginDrag}
            refreshControl={
                <RefreshControl
                    colors={colors}
                    onRefresh={handleRefresh}
                    progressBackgroundColor={theme.colors.secondary}
                    progressViewOffset={GLOBAL_STYLE.HEADER_TAB_HEIGHT}
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

export default Galeries;
