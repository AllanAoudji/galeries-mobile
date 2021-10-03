import * as React from 'react';
import {
    interpolate,
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { useWindowDimensions } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { ANIMATIONS } from '#helpers/constants';

import {
    BottomSheetContainer,
    Container,
    Handle,
    HandleContainer,
    InnerContainer,
    PressableWrapper,
} from './styles';
import { useComponentSize } from '#hooks';

export const BottomSheetContext = React.createContext<{
    closeBottomSheet: () => void;
    openBottomSheet: (renderItem: React.ComponentType) => void;
}>({
    closeBottomSheet: () => {},
    openBottomSheet: () => {},
});

export const BottomSheetProvider: React.FC<{}> = ({ children }) => {
    const dimension = useWindowDimensions();
    const { onLayout, size } = useComponentSize();

    const [Content, setContent] = React.useState<React.ComponentType | null>(
        null
    );

    const containerValue = useSharedValue(Content ? 1 : 0);
    const overLayStyle = useAnimatedStyle(() => ({
        opacity: containerValue.value,
    }));
    const bottomSheetStyle = useAnimatedStyle(() => {
        const top = interpolate(
            containerValue.value,
            [0, 1],
            [dimension.height, 0]
        );
        return { top };
    });

    const gestureHandler = useAnimatedGestureHandler({
        onStart(_, ctx: { startTop: number; current: number }) {
            ctx.startTop = containerValue.value;
        },
        onActive(e, ctx) {
            if (e.translationY + ctx.startTop > 0) {
                ctx.current = e.translationY + ctx.startTop;
                containerValue.value = interpolate(
                    e.translationY + ctx.startTop,
                    [0, dimension.height],
                    [1, 0]
                );
            }
        },
        onEnd(_, ctx) {
            if (!size || ctx.current < size.height)
                containerValue.value = withTiming(
                    1,
                    ANIMATIONS.TIMING_CONFIG()
                );
            else
                containerValue.value = withTiming(
                    0,
                    ANIMATIONS.TIMING_CONFIG(),
                    () => {
                        runOnJS(setContent)(null);
                    }
                );
        },
    });

    const openBottomSheet = React.useCallback(
        (renderItem: React.ComponentType) => {
            if (!Content) {
                setContent(renderItem);
                containerValue.value = withTiming(
                    1,
                    ANIMATIONS.TIMING_CONFIG()
                );
            }
        },
        [Content]
    );
    const closeBottomSheet = React.useCallback(() => {
        containerValue.value = withTiming(0, ANIMATIONS.TIMING_CONFIG(), () => {
            runOnJS(setContent)(null);
        });
    }, []);
    const handlePress = React.useCallback(
        () => closeBottomSheet(),
        [closeBottomSheet]
    );

    return (
        <BottomSheetContext.Provider
            value={{ closeBottomSheet, openBottomSheet }}
        >
            {children}
            {Content && (
                <>
                    <Container style={overLayStyle} />
                    <PanGestureHandler onGestureEvent={gestureHandler}>
                        <BottomSheetContainer
                            height={dimension.height}
                            style={bottomSheetStyle}
                        >
                            <PressableWrapper onPress={handlePress}>
                                <InnerContainer onLayout={onLayout}>
                                    <HandleContainer>
                                        <Handle />
                                    </HandleContainer>
                                    <Content />
                                </InnerContainer>
                            </PressableWrapper>
                        </BottomSheetContainer>
                    </PanGestureHandler>
                </>
            )}
        </BottomSheetContext.Provider>
    );
};
