import * as React from 'react';
import { BackHandler, useWindowDimensions } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import {
    interpolateColor,
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

import { ANIMATIONS } from '#helpers/constants';
import { useComponentSize } from '#hooks';

import {
    Container,
    Handle,
    HandleContainer,
    InnerContainer,
    Overlay,
    PressableOutside,
} from './styles';

export const BottomSheetContext = React.createContext<{
    closeBottomSheet: (callback?: () => void) => void;
    openBottomSheet: (component: React.ReactNode) => () => void;
    resetBottomSheet: () => void;
}>({
    closeBottomSheet: () => {},
    openBottomSheet: () => () => {},
    resetBottomSheet: () => {},
});

export const BottomSheetProvider: React.FC<{}> = ({ children }) => {
    const dimension = useWindowDimensions();
    const { onLayout, size } = useComponentSize();

    const containerValue = useSharedValue(dimension.height);
    const overLayValue = useSharedValue(0);

    const overLayStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            overLayValue.value,
            [0, 1],
            ['rgba(0,0,0,0)', 'rgba(0,0,0,0.4)']
        );
        return {
            backgroundColor,
            opacity: overLayValue.value,
        };
    });
    const containerStyle = useAnimatedStyle(() => ({
        top: containerValue.value,
    }));

    const [bottomSheetIsOpen, setBottomSheetIsOpen] =
        React.useState<boolean>(false);
    const [content, setContent] = React.useState<React.ReactNode | null>(null);
    const [newContent, setNewContent] = React.useState<React.ReactNode | null>(
        null
    );
    const [show, setShow] = React.useState<boolean>(false);
    const [switchContent, setSwitchContent] = React.useState<boolean>(false);

    const closeBottomSheet = React.useCallback((callback?: () => void) => {
        containerValue.value = withTiming(
            dimension.height,
            ANIMATIONS.TIMING_CONFIG(1000)
        );
        overLayValue.value = withTiming(
            0,
            ANIMATIONS.TIMING_CONFIG(200),
            (isFinished) => {
                if (isFinished) {
                    runOnJS(setBottomSheetIsOpen)(false);
                    runOnJS(setContent)(null);
                    runOnJS(setNewContent)(null);
                    runOnJS(setShow)(false);
                    if (callback) runOnJS(callback)();
                }
            }
        );
    }, []);
    const openBottomSheet = React.useCallback(
        (displayContent) => {
            setNewContent(displayContent);
            return () => {
                if (!show) setShow(true);
            };
        },
        [show]
    );
    const resetBottomSheet = React.useCallback(() => {
        setBottomSheetIsOpen(false);
        setContent(null);
        setNewContent(null);
        containerValue.value = dimension.height;
        overLayValue.value = 0;
    }, []);

    // Reset show value on mount/unmount
    React.useEffect(() => {
        setShow(false);
        return () => setShow(false);
    }, []);

    // Show overlay when 'show' state is true.
    // Reset all sharedValue/value when show === false.
    React.useEffect(() => {
        let BackHandlerListerner: any;
        if (show) {
            overLayValue.value = withTiming(1, ANIMATIONS.TIMING_CONFIG());
            BackHandlerListerner = BackHandler.addEventListener(
                'hardwareBackPress',
                () => {
                    if (show) {
                        setShow(false);
                        return true;
                    }
                    return false;
                }
            );
        } else {
            resetBottomSheet();
            if (BackHandlerListerner) BackHandlerListerner.remove();
        }
        return () => {
            if (BackHandlerListerner) BackHandlerListerner.remove();
        };
    }, [show]);

    // Display sheet content
    // or start the switch animation between 2 content.
    React.useEffect(() => {
        if (!!newContent && content !== newContent) {
            if (!content) {
                setContent(newContent);
                setNewContent(null);
            } else
                containerValue.value = withTiming(
                    size ? size.height : dimension.height,
                    ANIMATIONS.TIMING_CONFIG(),
                    (isFinished) => {
                        if (isFinished) {
                            runOnJS(setSwitchContent)(true);
                        }
                    }
                );
        }
        if (content && !newContent && !bottomSheetIsOpen) {
            setBottomSheetIsOpen(true);
            containerValue.value = withTiming(0, ANIMATIONS.TIMING_CONFIG());
        }
    }, [bottomSheetIsOpen, newContent, content, size]);

    // Display new content after Switch animation.
    React.useEffect(() => {
        if (switchContent) {
            setBottomSheetIsOpen(false);
            setContent(newContent);
            setNewContent(null);
            setSwitchContent(false);
        }
    }, [switchContent]);

    const gestureHandler = useAnimatedGestureHandler({
        onStart(_, ctx: { startTop: number }) {
            ctx.startTop = containerValue.value;
        },
        onActive(e, ctx) {
            if (
                e.translationY + ctx.startTop > 0 &&
                e.translationY + ctx.startTop <=
                    (size ? size.height : dimension.height)
            )
                containerValue.value = e.translationY + ctx.startTop;
        },
        onEnd() {
            if (!size || containerValue.value < (size.height * 2) / 5)
                containerValue.value = withTiming(
                    0,
                    ANIMATIONS.TIMING_CONFIG()
                );
            else runOnJS(closeBottomSheet)();
        },
    });

    return (
        <BottomSheetContext.Provider
            value={{
                closeBottomSheet,
                openBottomSheet,
                resetBottomSheet,
            }}
        >
            {children}
            {show && (
                <Overlay height={dimension.height} style={overLayStyle}>
                    <PanGestureHandler onGestureEvent={gestureHandler}>
                        <Container
                            height={dimension.height}
                            style={containerStyle}
                        >
                            <PressableOutside
                                onPress={() => closeBottomSheet()}
                            />
                            <InnerContainer onLayout={onLayout}>
                                <HandleContainer>
                                    <Handle />
                                </HandleContainer>
                                {content}
                            </InnerContainer>
                        </Container>
                    </PanGestureHandler>
                </Overlay>
            )}
        </BottomSheetContext.Provider>
    );
};
