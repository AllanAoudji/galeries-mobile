import * as React from 'react';
import {
    FlatList,
    NativeScrollEvent,
    NativeSyntheticEvent,
    useWindowDimensions,
    View,
} from 'react-native';

import Animated, {
    runOnJS,
    useAnimatedReaction,
    useAnimatedScrollHandler,
} from 'react-native-reanimated';
import { GalerieTabbarScreenContainer, AnimatedFlatList } from '#components';
import clamp from '#helpers/clamp';

type Props = {
    current: boolean;
    paddingTop: number;
    scrollHandler: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    scrollY: Animated.SharedValue<number>;
    maxScroll: number;
};

const renderItem = () => (
    <View
        style={{
            width: '100%',
            marginBottom: 10,
            height: 150,
            backgroundColor: 'red',
        }}
    />
);
const mockItem = [
    { id: '0' },
    { id: '1' },
    // { id: '2' },
    // { id: '3' },
    // { id: '4' },
    // { id: '5' },
    // { id: '6' },
];

const UsersScreen = ({ current, paddingTop, scrollY, maxScroll }: Props) => {
    const dimension = useWindowDimensions();
    const flatListRef = React.useRef<FlatList | null>(null);

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
                if (current)
                    scrollY.value = clamp(e.contentOffset.y, 0, maxScroll);
            },
        },
        [maxScroll, current]
    );

    return (
        <GalerieTabbarScreenContainer>
            <AnimatedFlatList
                contentContainerStyle={{
                    minHeight: dimension.height + maxScroll,
                    paddingTop,
                }}
                data={mockItem}
                renderItem={renderItem}
                ref={flatListRef}
                showsVerticalScrollIndicator={false}
                onScroll={scrollHandler}
            />
        </GalerieTabbarScreenContainer>
    );
};

export default UsersScreen;
