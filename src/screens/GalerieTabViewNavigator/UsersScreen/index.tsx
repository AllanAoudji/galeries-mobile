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
} from 'react-native-reanimated';
import { GalerieTabbarScreenContainer, AnimatedFlatList } from '#components';

type Props = {
    current: boolean;
    paddingTop: number;
    scrollHandler: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    scrollY: Animated.SharedValue<number>;
};

const renderItem = () => (
    <View
        style={{
            width: '100%',
            marginBottom: 10,
            height: 100,
            backgroundColor: 'red',
        }}
    />
);
const mockItem = [{ id: '0' }, { id: '1' }, { id: '2' }, { id: '3' }];

const UsersScreen = ({ current, paddingTop, scrollY }: Props) => {
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

    return (
        <GalerieTabbarScreenContainer>
            <AnimatedFlatList
                contentContainerStyle={{
                    paddingTop,
                    minHeight: dimension.height + paddingTop,
                }}
                data={mockItem}
                renderItem={renderItem}
                ref={flatListRef}
            />
        </GalerieTabbarScreenContainer>
    );
};

export default UsersScreen;
