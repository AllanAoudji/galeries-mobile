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
    fadeOutBottomSheet: (callback?: () => void) => void;
    openBottomSheet: (component: React.ReactNode) => () => void;
    resetBottomSheet: () => void;
}>({
    closeBottomSheet: () => {},
    fadeOutBottomSheet: () => {},
    openBottomSheet: () => () => {},
    resetBottomSheet: () => {},
});

export const BottomSheetProvider: React.FC<{}> = ({ children }) => {
    const dimension = useWindowDimensions();

    const containerTop = useSharedValue(dimension.height);
    const opacity = useSharedValue(1);
    const overLayBackgroundColor = useSharedValue(0);

    const overLayStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            overLayBackgroundColor.value,
            [0, 1],
            ['rgba(0,0,0,0)', 'rgba(0,0,0,0.4)']
        );
        return {
            backgroundColor,
            opacity: opacity.value,
        };
    });
    const containerStyle = useAnimatedStyle(() => {
        return {
            top: containerTop.value,
        };
    });

    const [containerHeight, setContainerHeight] = React.useState<number | null>(
        null
    );
    const [content, setContent] = React.useState<React.ReactNode | null>(null);
    const [newContent, setNewContent] = React.useState<React.ReactNode | null>(
        null
    );
    const [show, setShow] = React.useState<boolean>(false);
    const [switchContent, setSwitchContent] = React.useState<boolean>(false);

    // Reset show value on mount/unmount
    React.useEffect(() => {
        setShow(false);
        return () => {
            setShow(false);
        };
    }, []);

    // Show overlay when 'show' state is true.
    // Reset all sharedValue/value when show === false.
    React.useEffect(() => {
        let BackHandlerListerner: any;
        if (show) {
            overLayBackgroundColor.value = withTiming(
                1,
                ANIMATIONS.TIMING_CONFIG()
            );
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
            if (BackHandlerListerner) {
                BackHandlerListerner.remove();
            }
        }
        return () => {
            if (BackHandlerListerner) {
                BackHandlerListerner.remove();
            }
        };
    }, [show]);

    // Display sheet content
    // or start the switch animation between 2 content.
    React.useEffect(() => {
        if (!!newContent && content !== newContent) {
            if (!content) {
                setContent(newContent);
                setNewContent(null);
            } else {
                containerTop.value = withTiming(
                    containerHeight || dimension.height,
                    ANIMATIONS.TIMING_CONFIG(),
                    (isFinished) => {
                        if (isFinished) {
                            runOnJS(setSwitchContent)(true);
                        }
                    }
                );
            }
        }
        if (content && !newContent) {
            containerTop.value = withTiming(0, ANIMATIONS.TIMING_CONFIG());
        }
    }, [newContent, content]);

    // Display new content after Switch animation.
    React.useEffect(() => {
        if (switchContent) {
            setContent(newContent);
            setNewContent(null);
            setSwitchContent(false);
        }
    }, [switchContent]);

    const closeBottomSheet = React.useCallback((callback?: () => void) => {
        overLayBackgroundColor.value = withTiming(
            0,
            ANIMATIONS.TIMING_CONFIG(800),
            (isFinished) => {
                if (isFinished) runOnJS(setShow)(false);
            }
        );
        containerTop.value = withTiming(
            dimension.height,
            ANIMATIONS.TIMING_CONFIG(800),
            (isFinished) => {
                if (isFinished) {
                    runOnJS(setContent)(null);
                    runOnJS(setNewContent)(null);
                    if (callback) runOnJS(callback)();
                }
            }
        );
    }, []);
    const fadeOutBottomSheet = React.useCallback((callback?: () => void) => {
        opacity.value = withTiming(
            0,
            ANIMATIONS.TIMING_CONFIG(),
            (isFinish) => {
                if (isFinish) {
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
        setContent(null);
        setNewContent(null);
        overLayBackgroundColor.value = 0;
        containerTop.value = dimension.height;
        opacity.value = 1;
    }, []);

    const gestureHandler = useAnimatedGestureHandler({
        onStart(_, ctx: { startTop: number }) {
            ctx.startTop = containerTop.value;
        },
        onActive(e, ctx) {
            if (
                e.translationY + ctx.startTop > 0 &&
                e.translationY + ctx.startTop <=
                    (containerHeight || dimension.height)
            ) {
                containerTop.value = e.translationY + ctx.startTop;
            }
        },
        onEnd() {
            if (
                !containerHeight ||
                containerTop.value < (containerHeight * 2) / 5
            ) {
                containerTop.value = withTiming(0, ANIMATIONS.TIMING_CONFIG());
            } else {
                runOnJS(closeBottomSheet)();
            }
        },
    });

    return (
        <BottomSheetContext.Provider
            value={{
                closeBottomSheet,
                fadeOutBottomSheet,
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
                            <InnerContainer
                                onLayout={(e) => {
                                    setContainerHeight(
                                        e.nativeEvent.layout.height
                                    );
                                }}
                            >
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
