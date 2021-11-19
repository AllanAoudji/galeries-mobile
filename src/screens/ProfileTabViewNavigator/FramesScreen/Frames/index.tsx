import * as React from 'react';
import {
    FlatList,
    ListRenderItemInfo,
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
import { selectMeId } from '#store/me';
import { getUserFrames } from '#store/frames';

import RenderItem from './RenderItem';
import { GLOBAL_STYLE } from '#helpers/constants';
import ProfileTabViewMaxScroll from '#helpers/ProfileTabViewMaxScroll';

type Props = {
    allIds: string[];
    current: boolean;
    editScrollY: (offsetY: number, withAnimation?: boolean) => void;
    scrollY: Animated.SharedValue<number>;
};

const AnimatedFlatList = Animated.createAnimatedComponent<any>(FlatList);
const renderItem = ({ item }: ListRenderItemInfo<string>) => (
    <RenderItem item={item} />
);

const Frames = ({ allIds, current, editScrollY, scrollY }: Props) => {
    const dimension = useWindowDimensions();
    const dispatch = useDispatch();

    const flatListRef = React.useRef<FlatList | null>(null);

    const meId = useSelector(selectMeId);

    const styleProps = React.useMemo(
        () => ({
            minHeight: dimension.height + ProfileTabViewMaxScroll,
        }),
        [dimension]
    );

    const handleEndReach = React.useCallback(() => {
        if (!meId) return;
        dispatch(getUserFrames(meId));
    }, [meId]);
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
        [editScrollY, current]
    );

    React.useEffect(() => {
        if (current) {
            editScrollY(0, true);
        }
    }, []);

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
            GLOBAL_STYLE.PROFILE_TAB_BAR_INFOS +
            GLOBAL_STYLE.PROFILE_TAB_BAR_MENU +
            15,
    },
}));

export default Frames;
