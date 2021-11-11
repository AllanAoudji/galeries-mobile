import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import Animated, {
    interpolate,
    useAnimatedStyle,
} from 'react-native-reanimated';

import { GalerieCoverPicture, Pictogram, Typography } from '#components';
import GalerieTabViewMaxScroll from '#helpers/GalerieTabViewMaxScroll';

import { Container, TitleContainer, TypographyContainer } from './styles';

type Props = {
    galerie?: Store.Models.Galerie;
    scrollY: Animated.SharedValue<number>;
};

const Head = ({ galerie, scrollY }: Props) => {
    const navigation =
        useNavigation<Screen.DesktopBottomTab.GalerieNavigationProp>();

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

    const handlePressEdit = React.useCallback(() => {
        navigation.navigate('UpdateGalerie');
    }, [navigation]);

    return (
        <Container style={containerStyle}>
            <GalerieCoverPicture galerie={galerie} />
            <TitleContainer style={titleContainerStyle}>
                <TypographyContainer>
                    <Typography
                        color="secondary-light"
                        fontFamily="bold"
                        fontSize={24}
                    >
                        {galerie ? galerie.name : ''}
                    </Typography>
                </TypographyContainer>
                <Pictogram
                    color="secondary-light"
                    pb="smallest"
                    pl="smallest"
                    pt="smallest"
                    pr="small"
                    onPress={handlePressEdit}
                    variant="edit-fill"
                />
            </TitleContainer>
        </Container>
    );
};

export default React.memo(Head);
