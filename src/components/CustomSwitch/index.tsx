import * as React from 'react';
import {
    interpolate,
    interpolateColor,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { useTheme } from 'styled-components/native';

import { ANIMATIONS } from '#helpers/constants';

import { Container, Thumb, Track } from './styles';

const THUMB_SIZE = 22;
const TRACK_HEIGHT = 14;
const TRACK_WIDTH = 38;

type Props = {
    disabled?: boolean;
    mb?: keyof Style.Spacings;
    ml?: keyof Style.Spacings;
    mr?: keyof Style.Spacings;
    mt?: keyof Style.Spacings;
    onChange: () => void;
    pb?: keyof Style.Spacings;
    pl?: keyof Style.Spacings;
    pr?: keyof Style.Spacings;
    pt?: keyof Style.Spacings;
    value: boolean;
};

const CustomSwitch = ({
    disabled = false,
    mb,
    ml,
    mr,
    mt,
    onChange,
    pb,
    pl,
    pr,
    pt,
    value,
}: Props) => {
    const theme = useTheme();

    const status = useSharedValue(value ? 1 : 0);

    const thumbStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            status.value,
            [0, 1],
            [theme.colors['primary-light'], theme.colors.primary]
        );
        const left = interpolate(
            status.value,
            [0, 1],
            [0, TRACK_WIDTH - THUMB_SIZE]
        );
        return { left, backgroundColor };
    }, []);
    const trackStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            status.value,
            [0, 1],
            [theme.colors['secondary-dark'], theme.colors['primary-light']]
        );
        return { backgroundColor };
    }, []);

    const handlePress = React.useCallback(() => {
        if (!disabled) onChange();
    }, [disabled, onChange]);

    React.useEffect(() => {
        status.value = withTiming(value ? 1 : 0, ANIMATIONS.TIMING_CONFIG(150));
    }, [value]);

    return (
        <Container
            disabled={disabled}
            mb={mb}
            ml={ml}
            mr={mr}
            mt={mt}
            onPress={handlePress}
            pb={pb}
            pl={pl}
            pr={pr}
            pt={pt}
        >
            <Track
                height={TRACK_HEIGHT}
                style={trackStyle}
                thumbSize={THUMB_SIZE}
                width={TRACK_WIDTH}
            >
                <Thumb
                    size={THUMB_SIZE}
                    style={thumbStyle}
                    trackHeight={TRACK_HEIGHT}
                />
            </Track>
        </Container>
    );
};

export default React.memo(CustomSwitch);
