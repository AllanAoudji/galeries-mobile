import * as React from 'react';
import {
    Keyboard,
    Pressable,
    StatusBar,
    useWindowDimensions,
    View,
} from 'react-native';
import {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { useTheme } from 'styled-components/native';

import Pictogram from '#components/Pictogram';
import Typography from '#components/Typography';
import { ANIMATIONS, GLOBAL_STYLE } from '#helpers/constants';
import { useKeyboard, useComponentSize } from '#hooks';

import {
    Body,
    Container,
    Footer,
    Form,
    Header,
    KeyboardHeader,
    ReturnButton,
    Separator,
} from './styles';

type Props = {
    handleOnPressReturn?: () => void;
    title: string;
    renderTop: React.ReactNode;
    renderBottom?: React.ReactNode;
    renderFooter?: React.ReactNode;
};

const BODY_BORDER_TOP_RIGHT_RADIUS = 45;
const KEYBOARD_HEADER_HEIGHT = 100;

// TODO:
// use styledComponent
// and interpolation for animations
const FormScreen = ({
    handleOnPressReturn,
    renderBottom,
    renderFooter,
    renderTop,
    title,
}: Props) => {
    const { onLayout, size: bodySize } = useComponentSize();
    const { keyboardShown } = useKeyboard();
    const theme = useTheme();
    const dimension = useWindowDimensions();

    const [bodyHeight, setBodyHeight] = React.useState<number | null>(null);

    const bodyBorderTopRightRadius = useSharedValue(
        BODY_BORDER_TOP_RIGHT_RADIUS
    );
    const bodyOpacity = useSharedValue(0);
    const bodyTop = useSharedValue(0);
    const keyboardHeaderHeight = useSharedValue(0);
    const keyboardHeaderOpacity = useSharedValue(0);
    const opacity = useSharedValue(1);

    const styleBody = useAnimatedStyle(() => {
        return {
            top: bodySize ? bodyTop.value : 'auto',
            opacity: bodyOpacity.value,
            borderTopRightRadius: bodyBorderTopRightRadius.value,
        };
    }, [bodySize]);
    const styleHeader = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
        };
    }, []);
    const styleKeyboardHeader = useAnimatedStyle(() => {
        return {
            height: keyboardHeaderHeight.value,
            opacity: keyboardHeaderOpacity.value,
        };
    }, []);
    const styleReturnButton = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
        };
    }, []);

    React.useEffect(() => {
        if (bodySize && !bodyHeight) {
            bodyTop.value = dimension.height - bodySize.height;
            bodyOpacity.value = withTiming(1, ANIMATIONS.TIMING_CONFIG());
            setBodyHeight(dimension.height - bodySize.height);
        }
    }, [bodyHeight, bodySize]);
    React.useEffect(() => {
        if (keyboardShown) {
            bodyBorderTopRightRadius.value = withTiming(
                0,
                ANIMATIONS.TIMING_CONFIG()
            );
            bodyTop.value = withTiming(0, ANIMATIONS.TIMING_CONFIG());
            keyboardHeaderHeight.value = withTiming(
                KEYBOARD_HEADER_HEIGHT,
                ANIMATIONS.TIMING_CONFIG()
            );
            keyboardHeaderOpacity.value = withTiming(
                1,
                ANIMATIONS.TIMING_CONFIG()
            );
            opacity.value = withTiming(0, ANIMATIONS.TIMING_CONFIG());
        } else {
            bodyBorderTopRightRadius.value = withTiming(
                BODY_BORDER_TOP_RIGHT_RADIUS,
                ANIMATIONS.TIMING_CONFIG()
            );
            bodyTop.value = withTiming(
                bodyHeight || 0,
                ANIMATIONS.TIMING_CONFIG()
            );
            keyboardHeaderHeight.value = withTiming(
                0,
                ANIMATIONS.TIMING_CONFIG()
            );
            keyboardHeaderOpacity.value = withTiming(
                0,
                ANIMATIONS.TIMING_CONFIG()
            );
            opacity.value = withTiming(1, ANIMATIONS.TIMING_CONFIG());
        }
    }, [keyboardShown]);

    return (
        <Container
            colors={[theme.colors.tertiary, theme.colors.primary]}
            height={dimension.height}
        >
            <Header style={styleHeader}>
                <Typography
                    color="secondary-light"
                    fontFamily="light"
                    fontSize={36}
                    textAlign="right"
                >
                    {title.toUpperCase()}
                </Typography>
                <Separator />
            </Header>
            <Form onPress={Keyboard.dismiss}>
                {handleOnPressReturn && (
                    <ReturnButton
                        currentHeight={StatusBar.currentHeight}
                        style={styleReturnButton}
                    >
                        <Pictogram
                            color="secondary-light"
                            height={GLOBAL_STYLE.TOP_LEFT_PICTOGRAM_HEIGHT}
                            pl="small"
                            pr="small"
                            onPress={handleOnPressReturn}
                            variant="arrow-left"
                        />
                    </ReturnButton>
                )}
                <Body onLayout={onLayout} style={styleBody}>
                    <KeyboardHeader style={styleKeyboardHeader}>
                        {handleOnPressReturn && (
                            <Pressable onPress={handleOnPressReturn}>
                                <Pictogram
                                    variant="arrow-left"
                                    color="primary"
                                    size="small"
                                />
                            </Pressable>
                        )}
                        <Typography
                            color="primary"
                            fontFamily="light"
                            fontSize={18}
                        >
                            {title.toUpperCase()}
                        </Typography>
                    </KeyboardHeader>
                    <View
                        style={{
                            justifyContent: 'space-between',
                            flex: 1,
                        }}
                    >
                        {renderTop}
                        <View>
                            {renderBottom}
                            <Footer>{renderFooter}</Footer>
                        </View>
                    </View>
                </Body>
            </Form>
        </Container>
    );
};

export default FormScreen;
