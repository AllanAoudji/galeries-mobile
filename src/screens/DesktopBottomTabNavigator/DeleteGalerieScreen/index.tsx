import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentGalerie } from '#store/galeries';

import Header from './Header';

import Body from './Body';

import { Container } from './styles';

type Props = {
    navigation: Screen.DesktopBottomTab.DeleteGalerieNavigationProp;
};

const DeleteGalerieScreen = ({ navigation }: Props) => {
    const galerie = useSelector(selectCurrentGalerie);

    useFocusEffect(
        React.useCallback(() => {
            if (!galerie) {
                if (navigation.canGoBack()) navigation.goBack();
                else navigation.navigate('Home');
            }
        }, [galerie])
    );

    if (!galerie) return null;

    return (
        <Container>
            <Header galerie={galerie} />
            <Body galerie={galerie} />
        </Container>
    );
};

export default DeleteGalerieScreen;
