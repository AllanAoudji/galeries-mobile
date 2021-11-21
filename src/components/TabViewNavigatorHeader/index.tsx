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

import TabBar from './TabBar';

import { Container } from './styles';

type Props = SceneRendererProps & {
    backgroundColor?: keyof Style.Colors;
    maxScroll: number;
    navigationState: NavigationState<Route>;
    scrollY: Animated.SharedValue<number>;
    variant: 'center' | 'scroll';
};

const TabViewNavigatorHeader: React.FC<Props> = ({
    backgroundColor = 'secondary-light',
    children,
    maxScroll,
    scrollY,
    ...props
}) => {
    const containerStyle = useAnimatedStyle(() => {
        const translateY = interpolate(
            scrollY.value,
            [0, maxScroll],
            [0, -maxScroll]
        );
        return { transform: [{ translateY }] };
    }, [maxScroll]);

    return (
        <Container backgroundColor={backgroundColor} style={containerStyle}>
            {children}
            <TabBar {...props} />
        </Container>
    );
};

export default TabViewNavigatorHeader;
