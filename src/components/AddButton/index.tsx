import * as React from 'react';
import {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { useTheme } from 'styled-components/native';

import Pictogram from '#components/Pictogram';
import { ANIMATIONS } from '#helpers/constants';
import convertPixelToNum from '#helpers/convertPixelToNum';

import { Container, InnerContainer } from './styles';

type Props = {
    backgroundColor?: keyof Style.Colors;
    color?: keyof Style.Colors;
    loading?: Store.Status;
    onPress: () => void;
    right?: keyof Style.Spacings;
};

const SIZE = 50;

const AddButton = ({
    backgroundColor = 'primary',
    color = 'secondary-light',
    loading,
    onPress,
}: Props) => {
    const theme = useTheme();

    const finalBottomPosition = React.useMemo(
        () => convertPixelToNum(theme.spacings.largest),
        [theme]
    );

    const state = useSharedValue(!loading || loading === 'PENDING' ? 1 : 0);
    const style = useAnimatedStyle(() => {
        const bottom = interpolate(
            state.value,
            [0, 1],
            [-SIZE, finalBottomPosition]
        );
        return { bottom, transform: [{ scale: state.value }] };
    }, [finalBottomPosition]);

    React.useEffect(() => {
        if (!loading) return;
        if (loading === 'PENDING') {
            state.value = withTiming(1, ANIMATIONS.TIMING_CONFIG(600));
        } else {
            state.value = withTiming(0, ANIMATIONS.TIMING_CONFIG(600));
        }
    }, [loading]);

    return (
        <Container style={style}>
            <InnerContainer
                color={backgroundColor}
                onPress={onPress}
                size={SIZE}
            >
                <Pictogram color={color} variant="plus" />
            </InnerContainer>
        </Container>
    );
};

export default React.memo(AddButton);
