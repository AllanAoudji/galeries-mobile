import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import {
    FlatList,
    InteractionManager,
    ListRenderItemInfo,
    RefreshControl,
    StyleProp,
    StyleSheet,
    useWindowDimensions,
    ViewStyle,
} from 'react-native';
import Animated, {
    runOnJS,
    useAnimatedReaction,
    useAnimatedScrollHandler,
} from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components/native';

import { GLOBAL_STYLE } from '#helpers/constants';
import {
    getGalerieBlackLists,
    refreshGalerieBlackLists,
    selectCurrentGalerieGalerieBlackListsStatus,
} from '#store/galerieBlackLists';

import RenderItem from './RenderItem';
import GalerieTabViewMaxScroll from '#helpers/GalerieTabViewMaxScroll';

type Props = {
    allIds: string[];
    current: boolean;
    editScrollY: (offsetY: number) => void;
    galerie?: Store.Models.Galerie;
    scrollY: Animated.SharedValue<number>;
};

const AnimatedFlatList = Animated.createAnimatedComponent<any>(FlatList);
const renderItem = ({ index, item }: ListRenderItemInfo<string>) => (
    <RenderItem item={item} index={index} />
);

const GalerieBlackLists = ({
    allIds,
    current,
    editScrollY,
    galerie,
    scrollY,
}: Props) => {
    const dimension = useWindowDimensions();
    const dispatch = useDispatch();
    const theme = useTheme();

    const flatListRef = React.useRef<FlatList | null>(null);

    const loading = useSelector(selectCurrentGalerieGalerieBlackListsStatus);

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
            minHeight: dimension.height + GalerieTabViewMaxScroll,
        }),
        [dimension]
    );

    const handleEndReach = React.useCallback(() => {
        if (galerie)
            InteractionManager.runAfterInteractions(() => {
                dispatch(getGalerieBlackLists(galerie.id));
            });
    }, [galerie]);
    const handleRefresh = React.useCallback(() => {
        setRefreshing(true);
        if (galerie)
            InteractionManager.runAfterInteractions(() => {
                dispatch(refreshGalerieBlackLists(galerie.id));
            });
    }, [galerie]);
    const keyExtractor = React.useCallback((item: string) => item, []);
    const setInitialScroll = React.useCallback(
        (newScrollY: number) => {
            if (flatListRef.current && !current) {
                flatListRef.current.scrollToOffset({ offset: newScrollY });
            }
        },
        [current]
    );

    useAnimatedReaction(
        () => scrollY.value,
        (newScrollY) => {
            runOnJS(setInitialScroll)(newScrollY);
        },
        [setInitialScroll]
    );
    const scrollHandler = useAnimatedScrollHandler(
        {
            onScroll: (e) => {
                if (current) editScrollY(e.contentOffset.y);
            },
        },
        [current, editScrollY]
    );

    React.useEffect(() => {
        if (current) editScrollY(0);
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            if (loading === 'SUCCESS' && refreshing) setRefreshing(false);
        }, [loading, refreshing])
    );

    return (
        <AnimatedFlatList
            contentContainerStyle={
                style(styleProps).animatedFlatListContentContainerStyle
            }
            data={allIds}
            extraData={allIds}
            keyExtractor={keyExtractor}
            maxToRenderPerBatch={4}
            onEndReached={handleEndReach}
            onEndReachedThreshold={0.2}
            onScroll={scrollHandler}
            ref={flatListRef}
            refreshControl={
                <RefreshControl
                    colors={colors}
                    onRefresh={handleRefresh}
                    progressViewOffset={
                        GLOBAL_STYLE.GALERIE_TAB_BAR_COVER_PICTURE +
                        GLOBAL_STYLE.GALERIE_TAB_BAR_MENU
                    }
                    progressBackgroundColor={theme.colors['secondary-light']}
                    refreshing={refreshing}
                />
            }
            removeClippedSubviews={true}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
        />
    );
};

const style: ({ minHeight }: { minHeight: number }) => {
    animatedFlatListContentContainerStyle: StyleProp<ViewStyle>;
} = StyleSheet.create(({ minHeight }) => ({
    animatedFlatListContentContainerStyle: {
        minHeight,
        paddingBottom: GLOBAL_STYLE.BOTTOM_TAB_HEIGHT,
        paddingTop:
            GLOBAL_STYLE.GALERIE_TAB_BAR_COVER_PICTURE +
            GLOBAL_STYLE.GALERIE_TAB_BAR_MENU,
    },
}));

export default React.memo(GalerieBlackLists);
