import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useDispatch } from 'react-redux';

import GalerieCoverPicture from '#components/GalerieCoverPicture';
import { getGalerieId, updateGaleriesCurrent } from '#store/galeries';

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
            dispatch(getGalerieId(galerie.id));
            navigation.navigate('Galerie');
        }
    }, [galerie]);

    if (!galerie) return null;

    return (
        <Container onPress={handlePress}>
            <GalerieCoverPicture galerie={galerie} height={140} />
            <Footer galerie={galerie} />
        </Container>
    );
};

export default React.memo(GalerieCard);
