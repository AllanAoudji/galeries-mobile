import * as React from 'react';
import Animated, {
    interpolate,
    useAnimatedStyle,
} from 'react-native-reanimated';

import { GalerieCoverPicture, Pictogram, Typography } from '#components';

import {
    Container,
    EditPictogramContainer,
    TitleContainer,
    TypographyContainer,
} from './styles';

type Props = {
    galerie?: Store.Models.Galerie;
    maxScroll: number;
    scrollY: Animated.SharedValue<number>;
};

const Header = ({ galerie, maxScroll, scrollY }: Props) => {
    const containerStyle = useAnimatedStyle(() => {
        const borderBottomRightRadius = interpolate(
            scrollY.value,
            [0, -(maxScroll / 2), -maxScroll],
            [45, 45, 0]
        );
        return { borderBottomRightRadius };
    }, [maxScroll]);
    const titleContainerStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            scrollY.value,
            [0, -(maxScroll / 2), -maxScroll],
            [1, 1, 0]
        );
        return { opacity };
    }, [maxScroll]);

    return (
        <Container style={containerStyle}>
            <GalerieCoverPicture galerie={galerie} />
            <TitleContainer style={titleContainerStyle}>
                <TypographyContainer>
                    <Typography
                        color="secondary-light"
                        fontFamily="bold"
                        fontSize={36}
                    >
                        {galerie ? galerie.name : ''}
                    </Typography>
                </TypographyContainer>
                <EditPictogramContainer>
                    <Pictogram color="secondary-light" variant="edit-fill" />
                </EditPictogramContainer>
            </TitleContainer>
        </Container>
    );
};

export default Header;
