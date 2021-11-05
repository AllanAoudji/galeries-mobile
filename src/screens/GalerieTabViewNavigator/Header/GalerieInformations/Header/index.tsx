import * as React from 'react';
import Animated, {
    interpolate,
    useAnimatedStyle,
} from 'react-native-reanimated';

import { GalerieCoverPicture, Pictogram, Typography } from '#components';
import GalerieTabViewMaxScroll from '#helpers/GalerieTabViewMaxScroll';

import {
    Container,
    EditPictogramContainer,
    TitleContainer,
    TypographyContainer,
} from './styles';

type Props = {
    galerie?: Store.Models.Galerie;
    scrollY: Animated.SharedValue<number>;
};

const Header = ({ galerie, scrollY }: Props) => {
    const containerStyle = useAnimatedStyle(() => {
        const borderBottomRightRadius = interpolate(
            scrollY.value,
            [0, GalerieTabViewMaxScroll / 2, GalerieTabViewMaxScroll],
            [45, 45, 0]
        );
        return { borderBottomRightRadius };
    }, []);
    const titleContainerStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            scrollY.value,
            [0, GalerieTabViewMaxScroll / 2, GalerieTabViewMaxScroll],
            [1, 1, 0]
        );
        return { opacity };
    }, []);

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
