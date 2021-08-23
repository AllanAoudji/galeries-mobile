import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

import { ANIMATIONS } from '#helpers/constants';

import { AnimatedContainer, Container } from './styles';

type RenderProps = {
    handleClose: () => void;
};
type Props = {
    render: (props: RenderProps) => JSX.Element;
};

// TODO:
// This component is used right now for createGalerieScreen
// createGalerieScreen gonna be replace by a modal
// in the long term PageTransition should be delete
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
