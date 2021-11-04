import * as React from 'react';
import {
    Keyboard,
    ListRenderItemInfo,
    RefreshControl,
    StyleProp,
    StyleSheet,
    useWindowDimensions,
    ViewStyle,
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

import { StyledAnimatedFlatList } from './styles';

type Props = {
    allIds: string[];
    scrollHandler: any;
};

const renderItem = ({ item }: ListRenderItemInfo<string>) => (
    <RenderItem item={item} />
);

const Galeries = ({ allIds, scrollHandler }: Props) => {
    const dimension = useWindowDimensions();
    const dispatch = useDispatch();
    const theme = useTheme();

    const filterGaleriesName = useSelector(selectGaleriesFilterName);
    const galeriesNameStatus = useSelector(selectGaleriesNameStatus);
    const loading = useSelector(selectGaleriesNameStatus);

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
            minHeight:
                dimension.height +
                GLOBAL_STYLE.HEADER_TAB_HEIGHT -
                GLOBAL_STYLE.SEARCH_BAR_HEIGHT,
        }),
        []
    );

    const handleEndReached = React.useCallback(() => {
        if (galeriesNameStatus === 'ERROR' || galeriesNameStatus === 'SUCCESS')
            dispatch(getGaleries(filterGaleriesName));
    }, [filterGaleriesName, galeriesNameStatus]);
    const handleRefresh = React.useCallback(() => {
        setRefreshing(true);
        dispatch(refreshGaleries(filterGaleriesName));
    }, [filterGaleriesName]);
    const handleScrollBeginDrag = React.useCallback(
        () => Keyboard.dismiss(),
        []
    );
    const getItemLayout = React.useCallback(
        (_, index) => ({
            length: GLOBAL_STYLE.GALERIE_MODAL_HEIGHT,
            offset: GLOBAL_STYLE.GALERIE_MODAL_HEIGHT * index,
            index,
        }),
        []
    );
    const keyExtractor = React.useCallback((item: string) => item, []);

    React.useEffect(() => {
        if (loading === 'SUCCESS' && refreshing) setRefreshing(false);
    }, [loading, refreshing]);

    return (
        <StyledAnimatedFlatList
            contentContainerStyle={
                style(styleProps).animatedFlatListContentContainerStyle
            }
            data={allIds}
            extraData={allIds}
            getItemLayout={getItemLayout}
            keyExtractor={keyExtractor}
            initialNumToRender={5}
            keyboardShouldPersistTaps="handled"
            maxToRenderPerBatch={4}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.2}
            onScroll={scrollHandler}
            onScrollBeginDrag={handleScrollBeginDrag}
            refreshControl={
                <RefreshControl
                    colors={colors}
                    onRefresh={handleRefresh}
                    progressViewOffset={GLOBAL_STYLE.HEADER_TAB_HEIGHT}
                    progressBackgroundColor={theme.colors.secondary}
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
        paddingBottom: GLOBAL_STYLE.BOTTOM_TAB_HEIGHT,
        paddingTop: GLOBAL_STYLE.HEADER_TAB_HEIGHT,
        minHeight,
    },
}));

export default Galeries;
