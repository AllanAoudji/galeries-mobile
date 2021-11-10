import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useDispatch } from 'react-redux';

import GalerieCoverPicture from '#components/GalerieCoverPicture';
import { GLOBAL_STYLE } from '#helpers/constants';
import { getGalerieId, updateGaleriesCurrent } from '#store/galeries';

import Footer from './Footer';
import HasNewFrames from './HasNewFrames';
import Role from './Role';

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
    }, [galerie, navigation]);

    if (!galerie) return null;

    return (
        <Container onPress={handlePress}>
            <GalerieCoverPicture
                galerie={galerie}
                height={GLOBAL_STYLE.GALERIE_CARD_COVER_PICTURE_HEIGHT}
            />
            <Role galerie={galerie} />
            <HasNewFrames galerie={galerie} />
            <Footer galerie={galerie} />
        </Container>
    );
};

export default React.memo(GalerieCard);
