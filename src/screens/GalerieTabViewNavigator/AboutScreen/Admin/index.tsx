import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Typography, UserCard } from '#components';
import { getUserId, selectUser, updateUserCurrent } from '#store/users';

import { Container, TitleContainer } from './styles';
import { selectMe } from '#store/me';

type Props = {
    galerie: Store.Models.Galerie;
};

const Admin = ({ galerie }: Props) => {
    const dispatch = useDispatch();
    const navigation =
        useNavigation<Screen.DesktopBottomTab.GalerieNavigationProp>();

    const me = useSelector(selectMe);
    const userSelector = React.useMemo(
        () => selectUser(galerie.adminId),
        [galerie]
    );
    const user = useSelector(userSelector);

    const [fetchUser, setFetchUser] = React.useState<boolean>(false);

    useFocusEffect(
        React.useCallback(() => {
            if (!fetchUser) {
                setFetchUser(true);
                if (!user && galerie.adminId)
                    dispatch(getUserId(galerie.adminId));
            }
        }, [fetchUser, galerie, user])
    );

    const handlePress = React.useCallback(() => {
        if (!user) return;
        if (me && me.id === user.id) navigation.navigate('Profile');
        else {
            dispatch(updateUserCurrent(user.id));
            navigation.navigate('UserScreen');
        }
    }, [me, user]);

    if (!user) return null;

    return (
        <Container onPress={handlePress}>
            <TitleContainer>
                <Typography>CURRENT ADMINISTRATOR:</Typography>
            </TitleContainer>
            <UserCard user={user} color="secondary" />
        </Container>
    );
};

export default Admin;
