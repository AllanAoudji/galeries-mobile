import * as React from 'react';
import Animated, {
    interpolate,
    useAnimatedStyle,
} from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import { selectMe } from '#store/me';

import { ProfilePicture, Typography } from '#components';
import ProfileTabViewMaxScroll from '#helpers/ProfileTabViewMaxScroll';
import { Container, InnerContainer } from './styles';

type Props = {
    scrollY: Animated.SharedValue<number>;
};

const Head = ({ scrollY }: Props) => {
    const me = useSelector(selectMe);

    const titleContainerStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            scrollY.value,
            [0, ProfileTabViewMaxScroll / 2, ProfileTabViewMaxScroll],
            [1, 1, 0]
        );
        return { opacity };
    }, []);

    if (!me) return null;

    return (
        <Container>
            <InnerContainer style={titleContainerStyle}>
                <ProfilePicture user={me} size="largest" mb="smallest" />
                <Typography fontFamily="bold" fontSize={36}>
                    {me.pseudonym}
                </Typography>
                <Typography>{me.userName}</Typography>
            </InnerContainer>
        </Container>
    );
};

export default React.memo(Head);
