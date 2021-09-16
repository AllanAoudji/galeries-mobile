import * as React from 'react';
import { StyleSheet } from 'react-native';
import {
    PanGestureHandler,
    PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedReaction,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

import { CreateFrameContext } from '#contexts/CreateFrameContext';

import { ANIMATIONS, DRAG_AND_DROP_UTILS } from '#helpers/constants';

import { Container } from './styles';

type Props = {
    id: string;
};

const Item: React.FC<Props> = ({ children, id }) => {
    const { positions, switchPosition } = React.useContext(CreateFrameContext);

    const isGestureActive = useSharedValue(false);

    const position = React.useMemo(
        () => DRAG_AND_DROP_UTILS.getPosition(positions.value[id]),
        [positions]
    );

    const translateX = useSharedValue(position.x);
    const translateY = useSharedValue(position.y);
    const style = useAnimatedStyle(() => {
        const zIndex = isGestureActive.value ? 100 : 0;
        return {
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value },
            ],
            zIndex,
        };
    }, []);

    useAnimatedReaction(
        () => positions.value[id],
        (newOrder) => {
            const newPosition = DRAG_AND_DROP_UTILS.getPosition(newOrder);
            translateX.value = withTiming(
                newPosition.x,
                ANIMATIONS.TIMING_CONFIG(200)
            );
            translateY.value = withTiming(
                newPosition.y,
                ANIMATIONS.TIMING_CONFIG(200)
            );
        }
    );

    const handleGestureEvent = useAnimatedGestureHandler<
        PanGestureHandlerGestureEvent,
        { x: number; y: number }
    >({
        onStart: (_, ctx) => {
            isGestureActive.value = true;
            ctx.x = translateX.value;
            ctx.y = translateY.value;
        },
        onActive: ({ translationX, translationY }, ctx) => {
            translateX.value = ctx.x + translationX;
            translateY.value = ctx.y + translationY;
            const oldOrder = positions.value[id];
            const newOrder = DRAG_AND_DROP_UTILS.getOrder(
                translateX.value,
                translateY.value
            );
            switchPosition(id, oldOrder, newOrder);
        },
        onEnd: () => {
            const destination = DRAG_AND_DROP_UTILS.getPosition(
                positions.value[id]
            );
            translateX.value = withTiming(
                destination.x,
                ANIMATIONS.TIMING_CONFIG(200),
                () => {
                    isGestureActive.value = false;
                }
            );
            translateY.value = withTiming(
                destination.y,
                ANIMATIONS.TIMING_CONFIG(200)
            );
        },
    });

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
