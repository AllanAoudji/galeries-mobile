import * as React from 'react';
import { ActivityIndicator } from 'react-native';
import {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { useTheme } from 'styled-components/native';

import { ANIMATIONS } from '#helpers/constants';

import { Container } from './styles';

type Props = {
    backgroundColor?: keyof Style.Colors;
    color?: keyof Style.Colors;
    show: boolean;
};

const FullScreenLoader = ({
    color = 'primary',
    backgroundColor = 'secondary-light',
    show,
}: Props) => {
    const theme = useTheme();

    const [display, setDisplay] = React.useState<boolean>(show);
    const opacity = useSharedValue(display ? 1 : 0);

    const style = useAnimatedStyle(
        () => ({
            opacity: opacity.value,
        }),
        []
    );

    React.useEffect(() => {
        if (show) setDisplay(true);
        else {
            opacity.value = withTiming(
                0,
                ANIMATIONS.TIMING_CONFIG(100),
                (isFinished) => {
                    if (isFinished) runOnJS(setDisplay)(false);
                }
            );
        }
    }, [show]);
    React.useEffect(() => {
        if (display)
            opacity.value = withTiming(1, ANIMATIONS.TIMING_CONFIG(200));
    }, [display]);

    if (!display) return null;

    return (
        <Container color={backgroundColor} style={style}>
            <ActivityIndicator
                color={theme.colors[color]}
                size="large"
                style={{ transform: [{ scale: 1.2 }] }}
            />
        </Container>
    );
};

export default React.memo(FullScreenLoader);
