import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import styled from 'styled-components/native';

import { ANIMATIONS } from '#helpers/constants';

const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors['secondary-light']};
`;
const AnimatedContainer = styled(Animated.View)`
    flex: 1;
`;

type RenderProps = {
    handleClose: () => void;
};

type Props = {
    render: (props: RenderProps) => JSX.Element;
};

const PageTransition = ({ render }: Props) => {
    const dimension = useWindowDimensions();
    const opacity = useSharedValue(0);
    const transform = useSharedValue(dimension.height / 2);

    useFocusEffect(
        React.useCallback(() => {
            opacity.value = withTiming(1, ANIMATIONS.TIMING_CONFIG());
            transform.value = withTiming(0, ANIMATIONS.TIMING_CONFIG());
            return () => {
                opacity.value = withTiming(0, ANIMATIONS.TIMING_CONFIG());
                transform.value = withTiming(
                    dimension.height / 2,
                    ANIMATIONS.TIMING_CONFIG()
                );
            };
        }, [])
    );

    const handleClose = React.useCallback(() => {
        opacity.value = withTiming(0, ANIMATIONS.TIMING_CONFIG());
        transform.value = withTiming(
            dimension.height / 2,
            ANIMATIONS.TIMING_CONFIG()
        );
    }, []);

    const style = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [{ translateY: transform.value }],
        };
    }, []);
    return (
        <Container>
            <AnimatedContainer style={style}>
                {render({ handleClose })}
            </AnimatedContainer>
        </Container>
    );
};

export default PageTransition;
