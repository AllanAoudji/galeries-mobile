import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { Typography } from '#components';
import { selectCurrentGalerie } from '#store/galeries';
import { selectCurrentUser } from '#store/users';

import { Container } from './styles';
import { selectGalerieUserRole } from '#store/galerieRoles';

type Props = {
    navigation: Screen.DesktopBottomTab.UserScreen;
};

const UserScreen = ({ navigation }: Props) => {
    const galerie = useSelector(selectCurrentGalerie);
    const user = useSelector(selectCurrentUser);
    const roleSelector = React.useMemo(
        () =>
            selectGalerieUserRole(
                galerie ? galerie.id : null,
                user ? user.id : null
            ),
        [galerie, user]
    );
    const role = useSelector(roleSelector);

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
        <Container>
            <Typography>{user.pseudonym}</Typography>
            <Typography>{galerie.name}</Typography>
            <Typography>{role || 'role not found'}</Typography>
        </Container>
    );
};

export default UserScreen;
