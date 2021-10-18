import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useDispatch } from 'react-redux';

import { updateGaleriesCurrent } from '#store/galeries';

import CoverPicture from './CoverPicture';
import Footer from './Footer';

import { Container } from './styles';

type Props = {
    galerie?: Store.Models.Galerie;
};

const GalerieCard = ({ galerie }: Props) => {
    const dispatch = useDispatch();
    const navigation =
        useNavigation<Screen.DesktopBottomTab.GaleriesNavigationProp>();

    const handlePress = React.useCallback(() => {
        if (galerie) {
            dispatch(updateGaleriesCurrent(galerie.id));
            navigation.navigate('Galerie');
        }
    }, [galerie]);

    if (!galerie) return null;

    return (
        <Container onPress={handlePress}>
            <CoverPicture galerie={galerie} />
            <Footer galerie={galerie} />
        </Container>
    );
};

export default React.memo(GalerieCard);
