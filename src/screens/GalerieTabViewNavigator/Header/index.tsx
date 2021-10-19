import * as React from 'react';
import { LayoutChangeEvent } from 'react-native';
import Animated, {
    interpolate,
    useAnimatedStyle,
} from 'react-native-reanimated';
import {
    NavigationState,
    Route,
    SceneRendererProps,
} from 'react-native-tab-view';

import TabBar from './TabBar';

import GalerieInformations from './GalerieInformations';

import { Container } from './styles';

type Props = SceneRendererProps & {
    galerie?: Store.Models.Galerie;
    maxScroll: number;
    navigationState: NavigationState<Route>;
    onLayoutContainer: (event: LayoutChangeEvent) => void;
    onLayoutInfo: (event: LayoutChangeEvent) => void;
    scrollY: Animated.SharedValue<number>;
};

const Header = ({
    galerie,
    maxScroll,
    onLayoutContainer,
    onLayoutInfo,
    scrollY,
    ...props
}: Props) => {
    const containerStyle = useAnimatedStyle(() => {
        const translateY = interpolate(
            scrollY.value,
            [0, maxScroll],
            [0, -maxScroll]
        );
        return { transform: [{ translateY }] };
    }, [maxScroll]);

    return (
        <Container onLayout={onLayoutContainer} style={containerStyle}>
            <GalerieInformations
                galerie={galerie}
                maxScroll={maxScroll}
                onLayout={onLayoutInfo}
                scrollY={scrollY}
            />
            <TabBar {...props} />
        </Container>
    );
};

export default Header;
