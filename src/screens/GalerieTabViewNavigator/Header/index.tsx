import * as React from 'react';
import Animated, {
    interpolate,
    useAnimatedStyle,
} from 'react-native-reanimated';
import {
    NavigationState,
    Route,
    SceneRendererProps,
} from 'react-native-tab-view';

import GalerieTabViewMaxScroll from '#helpers/GalerieTabViewMaxScroll';

import TabBar from './TabBar';

import GalerieInformations from './GalerieInformations';

import { Container } from './styles';

type Props = SceneRendererProps & {
    galerie?: Store.Models.Galerie;
    navigationState: NavigationState<Route>;
    scrollY: Animated.SharedValue<number>;
};

const Header = ({ galerie, scrollY, ...props }: Props) => {
    const containerStyle = useAnimatedStyle(() => {
        const translateY = interpolate(
            scrollY.value,
            [0, GalerieTabViewMaxScroll],
            [0, -GalerieTabViewMaxScroll]
        );
        return { transform: [{ translateY }] };
    }, []);

    return (
        <Container style={containerStyle}>
            <GalerieInformations galerie={galerie} scrollY={scrollY} />
            <TabBar {...props} />
        </Container>
    );
};

export default Header;
