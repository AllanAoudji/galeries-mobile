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

type Props = {
    disabled?: boolean;
    onChange: () => void;
    mb?: keyof Style.Spacings;
    ml?: keyof Style.Spacings;
    mr?: keyof Style.Spacings;
    mt?: keyof Style.Spacings;
    pb?: keyof Style.Spacings;
    pl?: keyof Style.Spacings;
    pr?: keyof Style.Spacings;
    pt?: keyof Style.Spacings;
    value: boolean;
};

const CustomSwitch = ({
    disabled = false,
    onChange,
    mb,
    ml,
    mr,
    mt,
    pb,
    pl,
    pr,
    pt,
    value,
}: Props) => {
    const theme = useTheme();

    const status = useSharedValue(value ? 1 : 0);

    const thumbStyle = useAnimatedStyle(() => {
        const left = interpolate(status.value, [0, 1], [0, 16]);
        const backgroundColor = interpolateColor(
            status.value,
            [0, 1],
            [theme.colors['primary-light'], theme.colors.primary]
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
            <Track style={trackStyle}>
                <Thumb style={thumbStyle} />
            </Track>
        </Container>
    );
};

export default React.memo(CustomSwitch);
