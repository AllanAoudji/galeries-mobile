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
import { useSelector } from 'react-redux';

import {
    ProfilePicture,
    TabViewNavigatorHeader,
    Typography,
} from '#components';
import ProfileTabViewMaxScroll from '#helpers/ProfileTabViewMaxScroll';
import { selectMe } from '#store/me';

import { Container, InnerContainer } from './styles';

type Props = SceneRendererProps & {
    navigationState: NavigationState<Route>;
    scrollY: Animated.SharedValue<number>;
};

const Header = ({ scrollY, ...props }: Props) => {
    const me = useSelector(selectMe);

    const titleContainerStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            scrollY.value,
            [0, ProfileTabViewMaxScroll / 2, ProfileTabViewMaxScroll],
            [1, 1, 0]
        );
        return { opacity };
    }, []);

    return (
        <TabViewNavigatorHeader
            maxScroll={ProfileTabViewMaxScroll}
            scrollY={scrollY}
            variant="center"
            {...props}
        >
            <Container>
                {!!me && (
                    <InnerContainer style={titleContainerStyle}>
                        <ProfilePicture
                            mb="smallest"
                            size="largest"
                            user={me}
                        />
                        <Typography fontFamily="bold" fontSize={36}>
                            {me.pseudonym}
                        </Typography>
                        <Typography>{me.userName}</Typography>
                    </InnerContainer>
                )}
            </Container>
        </TabViewNavigatorHeader>
    );
};

export default Header;
