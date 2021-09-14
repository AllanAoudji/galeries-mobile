import * as React from 'react';
import { ActivityIndicator, useWindowDimensions } from 'react-native';
import {
    interpolate,
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
    const dimension = useWindowDimensions();
    const theme = useTheme();

    const [display, setDisplay] = React.useState<boolean>(show);

    const visible = useSharedValue(show ? 1 : 0);

    const containerStyle = useAnimatedStyle(() => {
        const bottom = interpolate(
            visible.value,
            [0, 1],
            [START_BOTTOM_POSITION, endBottomPosition || END_BOTTOM_POSITION]
        );
        return {
            bottom,
            opacity: visible.value,
        };
    }, []);

    React.useEffect(() => {
        if (show) setDisplay(true);
        else
            visible.value = withTiming(
                0,
                ANIMATIONS.TIMING_CONFIG(200),
                (isFinished) => {
                    if (isFinished) runOnJS(setDisplay)(false);
                }
            );
    }, [show]);
    React.useEffect(() => {
        if (display)
            visible.value = withTiming(1, ANIMATIONS.TIMING_CONFIG(200));
    }, [display]);

    if (!display) return null;

    return (
        <Container style={containerStyle} width={dimension.width}>
            <LoaderContainer color={backgroundColor}>
                <ActivityIndicator color={theme.colors[color]} size="small" />
            </LoaderContainer>
        </Container>
    );
};

export default BottomLoader;
