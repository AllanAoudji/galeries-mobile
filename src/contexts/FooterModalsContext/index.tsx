import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
    Easing,
    interpolateColor,
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import styled from 'styled-components/native';

type PropsOverLay = {
    height: number;
};
type PropsContainer = {
    height: number;
};

const TIMING_CONFIG: Animated.WithTimingConfig = {
    duration: 400,
    easing: Easing.inOut(Easing.ease),
};

const Bar = styled.View`
    background-color: ${({ theme }) => theme.colors['secondary-dark']};
    border-radius: 100px;
    height: 4px;
    width: 30px;
`;
const BarContainer = styled.View`
    align-items: center;
    margin-bottom: ${({ theme }) => theme.spacings.small};
`;
const Container = styled(Animated.View)<PropsContainer>`
    bottom: 0;
    height: ${({ height }) => `${height}px`};
    justify-content: flex-end;
    left: 0;
    position: absolute;
    right: 0;
`;
const InnerContainer = styled.View`
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    padding: ${({ theme }) =>
        `${theme.spacings.smallest} ${theme.spacings.small} ${theme.spacings.small}`};
`;
const Overlay = styled(Animated.View)<PropsOverLay>`
    background-color: rgba(0, 0, 0, 0.4);
    bottom: 0;
    height: ${({ height }) => `${height}px`};
    position: absolute;
    left: 0;
    right: 0;
    display: none;
    top: 0;
`;
const Outside = styled.Pressable`
    flex: 1;
`;
export const FooterModalsContext = React.createContext<{
    closeOverlay: () => void;
    openModal: (component: React.ReactNode) => () => void;
}>({
    closeOverlay: () => {},
    openModal: () => () => {},
});

export const FooterModalsProvider: React.FC<{}> = ({ children }) => {
    const dimension = useWindowDimensions();

    const visibility = useSharedValue(0);
    const contentVisibility = useSharedValue(dimension.height);
    const overLayStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            visibility.value,
            [0, 1],
            ['rgba(0,0,0,0)', 'rgba(0,0,0,0.4)']
        );
        return {
            backgroundColor,
        };
    });
    const containerStyle = useAnimatedStyle(() => {
        return {
            top: contentVisibility.value,
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

    React.useEffect(() => {
        setShow(false);
        return () => {
            setShow(false);
        };
    }, []);
    React.useEffect(() => {
        if (show) visibility.value = withTiming(1, TIMING_CONFIG);
        else {
            setContent(null);
            setNewContent(null);
            visibility.value = 0;
            contentVisibility.value = dimension.height;
        }
    }, [show]);
    React.useEffect(() => {
        if (!!newContent && content !== newContent) {
            if (!content) {
                setContent(newContent);
                setNewContent(null);
            } else {
                contentVisibility.value = withTiming(
                    containerHeight || dimension.height,
                    TIMING_CONFIG,
                    (isFinished) => {
                        if (isFinished) {
                            runOnJS(setSwitchContent)(true);
                        }
                    }
                );
            }
        }
        if (content && !newContent) {
            contentVisibility.value = withTiming(0, TIMING_CONFIG);
        }
    }, [newContent, content]);

    React.useEffect(() => {
        if (switchContent) {
            setContent(newContent);
            setNewContent(null);
            setSwitchContent(false);
        }
    }, [switchContent]);

    const openModal = React.useCallback(
        (c) => {
            setNewContent(c);
            return () => {
                if (!show) {
                    setShow(true);
                }
            };
        },
        [show]
    );
    const closeOverlay = React.useCallback(() => {
        visibility.value = withTiming(0, TIMING_CONFIG, (isFinished) => {
            if (isFinished) runOnJS(setShow)(false);
        });
        contentVisibility.value = withTiming(
            dimension.height,
            TIMING_CONFIG,
            (isFinished) => {
                if (isFinished) {
                    runOnJS(setContent)(null);
                    runOnJS(setNewContent)(null);
                }
            }
        );
    }, []);

    const gestureHandler = useAnimatedGestureHandler({
        onStart(_, ctx: { startTop: number }) {
            ctx.startTop = contentVisibility.value;
        },
        onActive(e, ctx) {
            if (
                e.translationY + ctx.startTop > 0 &&
                e.translationY + ctx.startTop <=
                    (containerHeight || dimension.height)
            ) {
                contentVisibility.value = e.translationY + ctx.startTop;
            }
        },
        onEnd() {
            if (
                !containerHeight ||
                contentVisibility.value < (containerHeight * 2) / 5
            ) {
                contentVisibility.value = withTiming(0, TIMING_CONFIG);
            } else {
                runOnJS(closeOverlay)();
            }
        },
    });

    return (
        <FooterModalsContext.Provider
            value={{
                closeOverlay,
                openModal,
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
                            <Outside onPress={closeOverlay} />
                            <InnerContainer
                                onLayout={(e) => {
                                    setContainerHeight(
                                        e.nativeEvent.layout.height
                                    );
                                }}
                            >
                                <BarContainer>
                                    <Bar />
                                </BarContainer>
                                {content}
                            </InnerContainer>
                        </Container>
                    </PanGestureHandler>
                </Overlay>
            )}
        </FooterModalsContext.Provider>
    );
};
