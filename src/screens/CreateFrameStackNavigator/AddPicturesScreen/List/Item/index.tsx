import * as React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import { COL, SIZE, Positions, getPosition } from '../../utils';

type Props = {
    id: string;
    positions: Animated.SharedValue<Positions>;
};

const Container = styled(Animated.View)`
    height: ${() => `${SIZE}px`};
    position: absolute;
    width: ${() => `${SIZE}px`};
`;

const Item: React.FC<Props> = ({ children, id, positions }) => {
    const inset = useSafeAreaInsets();
    const dimension = useWindowDimensions();
    const containerHeight = React.useMemo(
        () => dimension.height - inset.top - inset.bottom,
        [dimension, inset]
    );
    const contentHeight = React.useMemo(
        () => (Object.keys(positions.value).length / COL) * SIZE,
        [positions]
    );
    const position = getPosition(positions.value[id]);
    const translateX = useSharedValue(position.x);
    const translateY = useSharedValue(position.y);
    const handleGestureEvent = useAnimatedGestureHandler({
        onActive: ({ translationX, translationY }) => {
            translateX.value = translationX;
            translateY.value = translationY;
        },
    });
    const style = useAnimatedStyle(
        () => ({
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value },
            ],
        }),
        []
    );
    return (
        <Container style={style}>
            <PanGestureHandler onGestureEvent={handleGestureEvent}>
                <Animated.View style={StyleSheet.absoluteFill}>
                    {children}
                </Animated.View>
            </PanGestureHandler>
        </Container>
    );
};

export default Item;
