import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import {
    FlatList,
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
    getGalerieUsers,
    refreshGalerieUsers,
    selectCurrentGalerieUsersStatus,
} from '#store/users';

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
    <RenderItem index={index} item={item} />
);

const Users = ({ allIds, current, editScrollY, galerie, scrollY }: Props) => {
    const dimension = useWindowDimensions();
    const dispatch = useDispatch();
    const theme = useTheme();

    const flatListRef = React.useRef<FlatList | null>(null);

    const loading = useSelector(selectCurrentGalerieUsersStatus);

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
        if (galerie) dispatch(getGalerieUsers(galerie.id));
    }, [galerie]);
    const handleRefresh = React.useCallback(() => {
        setRefreshing(true);
        if (galerie) dispatch(refreshGalerieUsers(galerie.id));
    }, [galerie]);
    const keyExtractor = React.useCallback((item: string) => item, []);
    const setInitialScroll = React.useCallback(
        (newScrollY: number) => {
            if (flatListRef.current && !current) {
                flatListRef.current.scrollToOffset({
                    animated: false,
                    offset: newScrollY,
                });
            }
        },
        [current]
    );

    useAnimatedReaction(
        () => scrollY.value,
        (newScrollY) => {
            runOnJS(setInitialScroll)(newScrollY);
        },
        [current]
    );
    const scrollHandler = useAnimatedScrollHandler(
        {
            onScroll: (e) => {
                if (current) editScrollY(e.contentOffset.y);
            },
        },
        [editScrollY, current]
    );

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
            scrollEventThrottle={4}
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
export default React.memo(Users);
