import * as React from 'react';
import { useDispatch } from 'react-redux';
import {
    FlatList,
    ListRenderItemInfo,
    StyleProp,
    StyleSheet,
    useWindowDimensions,
    ViewStyle,
    RefreshControl,
} from 'react-native';

import Animated, {
    runOnJS,
    useAnimatedReaction,
    useAnimatedScrollHandler,
} from 'react-native-reanimated';
import { AnimatedFlatList } from '#components';
import { GLOBAL_STYLE } from '#helpers/constants';
import { getGalerieFrames } from '#store/frames';

import RenderItem from './RenderItem';

type Props = {
    allIds: string[];
    current: boolean;
    editScrollY: (offsetY: number) => void;
    galerie?: Store.Models.Galerie;
    maxScroll: number;
    paddingTop: number;
    scrollY: Animated.SharedValue<number>;
};

const renderItem = ({ item }: ListRenderItemInfo<string>) => (
    <RenderItem item={item} />
);

const Frames = ({
    allIds,
    current,
    editScrollY,
    galerie,
    maxScroll,
    paddingTop,
    scrollY,
}: Props) => {
    const dimension = useWindowDimensions();
    const dispatch = useDispatch();

    const flatListRef = React.useRef<FlatList | null>(null);

    const [refreshing, setRefreshing] = React.useState<boolean>(false);

    const styleProps = React.useMemo(
        () => ({
            minHeight: dimension.height + maxScroll,
            paddingTop,
        }),
        []
    );

    const handleEndReach = React.useCallback(() => {
        if (galerie) dispatch(getGalerieFrames(galerie.id));
    }, [galerie]);
    const handleRefresh = React.useCallback(() => {
        setRefreshing(true);
    }, []);
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

    return (
        <AnimatedFlatList
            contentContainerStyle={
                style(styleProps).animatedFlatListContentContainerStyle
            }
            style={{ flex: 1 }}
            data={allIds}
            extraData={allIds}
            keyExtractor={keyExtractor}
            maxToRenderPerBatch={4}
            onEndReached={handleEndReach}
            onEndReachedThreshold={0.2}
            onRefresh={handleRefresh}
            onScroll={scrollHandler}
            ref={flatListRef}
            refreshing={refreshing}
            removeClippedSubviews={true}
            renderItem={renderItem}
            scrollEventThrottle={4}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                />
            }
        />
    );
};

const style: ({
    minHeight,
    paddingTop,
}: {
    minHeight: number;
    paddingTop: number;
}) => {
    animatedFlatListContentContainerStyle: StyleProp<ViewStyle>;
} = StyleSheet.create(({ minHeight, paddingTop }) => ({
    animatedFlatListContentContainerStyle: {
        minHeight,
        paddingBottom: GLOBAL_STYLE.BOTTOM_TAB_HEIGHT,
        paddingTop,
    },
}));

export default Frames;
