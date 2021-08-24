import * as React from 'react';
import { ActivityIndicator, useWindowDimensions } from 'react-native';
import {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { useTheme } from 'styled-components/native';

import { ANIMATIONS } from '#helpers/constants';

import { Container, LoaderContainer } from './styles';

type Props = {
    backgroundColor?: keyof Style.Colors;
    color?: keyof Style.Colors;
    endBottomPosition?: number;
    show: boolean;
};

const END_BOTTOM_POSITION = 15;
const START_BOTTOM_POSITION = 5;

const BottomLoader = ({
    backgroundColor = 'primary',
    color = 'secondary-light',
    endBottomPosition,
    show,
}: Props) => {
    const theme = useTheme();
    const dimension = useWindowDimensions();

    const [display, setDisplay] = React.useState<boolean>(false);
    const bottom = useSharedValue(START_BOTTOM_POSITION);
    const opacity = useSharedValue(0);

    const containerStyle = useAnimatedStyle(
        () => ({
            bottom: bottom.value,
        }),
        []
    );
    const loaderContainerStyle = useAnimatedStyle(
        () => ({
            opacity: opacity.value,
        }),
        []
    );

    React.useEffect(() => {
        if (show) setDisplay(true);
        else {
            bottom.value = withTiming(
                START_BOTTOM_POSITION,
                ANIMATIONS.TIMING_CONFIG(200)
            );
            opacity.value = withTiming(
                0,
                ANIMATIONS.TIMING_CONFIG(200),
                (isFinished) => {
                    if (isFinished) {
                        runOnJS(setDisplay)(false);
                    }
                }
            );
        }
    }, [show]);
    React.useEffect(() => {
        if (display) {
            opacity.value = withTiming(1, ANIMATIONS.TIMING_CONFIG(200));
            bottom.value = withTiming(
                endBottomPosition || END_BOTTOM_POSITION,
                ANIMATIONS.TIMING_CONFIG(200)
            );
        }
    }, [display]);

    if (!display) {
        return null;
    }

    return (
        <Container width={dimension.width} style={containerStyle}>
            <LoaderContainer
                color={backgroundColor}
                style={loaderContainerStyle}
            >
                <ActivityIndicator color={theme.colors[color]} size="small" />
            </LoaderContainer>
        </Container>
    );
};

export default BottomLoader;
