import * as React from 'react';
import { useDispatch } from 'react-redux';
import {
    FlatList,
    ListRenderItemInfo,
    useWindowDimensions,
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

    const keyExtractor = React.useCallback((item: string) => item, []);
    const handleEndReach = React.useCallback(() => {
        if (galerie) dispatch(getGalerieFrames(galerie.id));
    }, [galerie]);
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
            contentContainerStyle={{
                minHeight: dimension.height + maxScroll,
                paddingBottom: GLOBAL_STYLE.BOTTOM_TAB_HEIGHT,
                paddingTop,
            }}
            data={allIds}
            extraData={allIds}
            keyExtractor={keyExtractor}
            maxToRenderPerBatch={4}
            onEndReached={handleEndReach}
            onEndReachedThreshold={0.2}
            onScroll={scrollHandler}
            ref={flatListRef}
            removeClippedSubviews={true}
            renderItem={renderItem}
            scrollEventThrottle={4}
            showsVerticalScrollIndicator={false}
        />
    );
};

export default Frames;
