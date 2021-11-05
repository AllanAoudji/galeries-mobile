import * as React from 'react';
import { useSelector } from 'react-redux';

import { selectGalerieUserRole } from '#store/galerieRoles';

import ButtonsContainer from './ButtonsContainer';
import UserInformations from './UserInformations';

import { Container } from './styles';

type Props = {
    galerie: Store.Models.Galerie;
    user: Store.Models.User;
};

const Body = ({ galerie, user }: Props) => {
    const roleSelector = React.useMemo(
        () =>
            selectGalerieUserRole(
                galerie ? galerie.id : null,
                user ? user.id : null
            ),
        [galerie, user]
    );
    const role = useSelector(roleSelector);

    return (
        <Container
            justifyContent={
                galerie.role === 'user' ? 'flex-start' : 'space-between'
            }
        >
            <UserInformations role={role} user={user} />
            <ButtonsContainer galerie={galerie} role={role} user={user} />
        </Container>
    );
};

export default Body;
