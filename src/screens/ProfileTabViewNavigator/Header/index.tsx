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

import Head from './Head';
import ProfileTabViewMaxScroll from '#helpers/ProfileTabViewMaxScroll';
import TabBar from './TabBar';

import { Container } from './styles';

type Props = SceneRendererProps & {
    navigationState: NavigationState<Route>;
    scrollY: Animated.SharedValue<number>;
};

const Header = ({ scrollY, ...props }: Props) => {
    const containerStyle = useAnimatedStyle(() => {
        const translateY = interpolate(
            scrollY.value,
            [0, ProfileTabViewMaxScroll],
            [0, -ProfileTabViewMaxScroll]
        );
        return { transform: [{ translateY }] };
    }, []);

    return (
        <Container style={containerStyle}>
            <Head scrollY={scrollY} />
            <TabBar {...props} />
        </Container>
    );
};

export default Header;
