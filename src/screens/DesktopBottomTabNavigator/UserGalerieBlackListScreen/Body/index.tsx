import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Typography, UserCard } from '#components';
import { selectGalerie } from '#store/galeries';
import { selectGalerieUserRole } from '#store/galerieRoles';
import { selectMe } from '#store/me';
import { selectUser, updateUserCurrent } from '#store/users';

import { BlackListedByContainer, Container, TitleContainer } from './styles';

type Props = {
    galerieBlackList: Store.Models.GalerieBlackList;
};

const Body = ({ galerieBlackList }: Props) => {
    const dispatch = useDispatch();
    const navigation =
        useNavigation<Screen.DesktopBottomTab.UserGalerieBlackListNavigationProp>();

    const galerieSelector = React.useMemo(
        () => selectGalerie(galerieBlackList.galerieId),
        [galerieBlackList]
    );
    const galerie = useSelector(galerieSelector);
    const me = useSelector(selectMe);
    const userSelector = React.useMemo(
        () => selectUser(galerieBlackList.createdById),
        [galerieBlackList]
    );
    const user = useSelector(userSelector);
    const roleSelector = React.useMemo(
        () =>
            selectGalerieUserRole(
                galerieBlackList.galerieId,
                user ? user.id : undefined
            ),
        [galerieBlackList, user]
    );
    const role = useSelector(roleSelector);

    const userRole = React.useMemo(() => {
        if (!galerieBlackList.createdById) return undefined;
        if (me && me.id === galerieBlackList.createdById)
            return galerie ? galerie.role : undefined;
        return role;
    }, [galerie, galerieBlackList, me, role]);

    const handlePress = React.useCallback(() => {
        if (!user) return;
        if (me && me.id === user.id) navigation.navigate('Profile');
        else {
            dispatch(updateUserCurrent(user.id));
            navigation.navigate('UserScreen');
        }
    }, [me, user]);

    return (
        <Container>
            {!!user && (
                <BlackListedByContainer onPress={handlePress}>
                    <TitleContainer>
                        <Typography>BLACKLISTED BY:</Typography>
                    </TitleContainer>
                    <UserCard role={userRole} user={user} />
                </BlackListedByContainer>
            )}
            <Typography fontFamily="light" textAlign="right">
                Created there is {moment(galerieBlackList.createdAt).fromNow()}.
            </Typography>
        </Container>
    );
};

export default Body;
