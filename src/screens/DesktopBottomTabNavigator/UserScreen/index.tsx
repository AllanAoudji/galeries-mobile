import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { DeleteGalerieUserModalProvider } from '#contexts/DeleteGalerieUserModalContext';
import { selectCurrentGalerie } from '#store/galeries';
import { selectCurrentUser } from '#store/users';

import { Container } from './styles';

import Body from './Body';
import Header from './Header';

type Props = {
    navigation: Screen.DesktopBottomTab.UserScreen;
};

const UserScreen = ({ navigation }: Props) => {
    const galerie = useSelector(selectCurrentGalerie);
    const user = useSelector(selectCurrentUser);

    useFocusEffect(
        React.useCallback(() => {
            if (!galerie || !user) {
                if (navigation.canGoBack()) navigation.goBack();
                else navigation.navigate('Home');
            }
        }, [galerie, user])
    );

    if (!galerie || !user) return null;

    return (
        <DeleteGalerieUserModalProvider>
            <Container>
                <Header galerie={galerie} user={user} />
                <Body galerie={galerie} user={user} />
            </Container>
        </DeleteGalerieUserModalProvider>
    );
};

export default UserScreen;
