import * as React from 'react';
import {
    FlatList,
    InteractionManager,
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
import { useDispatch } from 'react-redux';
import ProfileTabViewMaxScroll from '#helpers/ProfileTabViewMaxScroll';

import RenderItem from './RenderItem';
import { getProfilePictures } from '#store/profilePictures';
import { GLOBAL_STYLE } from '#helpers/constants';

type Props = {
    allIds: string[];
    current: boolean;
    editScrollY: (offsetY: number) => void;
    scrollY: Animated.SharedValue<number>;
};

const AnimatedFlatList = Animated.createAnimatedComponent<any>(FlatList);
const renderItem = ({ item }: ListRenderItemInfo<string>) => (
    <RenderItem item={item} />
);

const ProfilePictures = ({ allIds, current, editScrollY, scrollY }: Props) => {
    const dimension = useWindowDimensions();
    const dispatch = useDispatch();

    const flatListRef = React.useRef<FlatList | null>(null);

    const styleProps = React.useMemo(
        () => ({
            minHeight: dimension.height + ProfileTabViewMaxScroll,
        }),
        [dimension]
    );

    const handleEndReach = React.useCallback(() => {
        InteractionManager.runAfterInteractions(() => {
            dispatch(getProfilePictures());
        });
    }, []);
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
        if (current) editScrollY(0);
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
            GLOBAL_STYLE.PROFILE_TAB_BAR_MENU,
    },
}));

export default ProfilePictures;
