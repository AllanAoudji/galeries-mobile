import * as React from 'react';

import ChangeRoleButton from './ChangeRoleButton';
import DeleteBanButton from './DeleteBanButton';

import { Container } from './styles';

type Props = {
    galerie: Store.Models.Galerie;
    role?: Store.Role;
    user: Store.Models.User;
};

const ButtonsContainer = ({ galerie, role, user }: Props) => {
    if (galerie.role === 'user') return null;
    if (!role) return null;

    return (
        <Container>
            <ChangeRoleButton galerie={galerie} role={role} user={user} />
            <DeleteBanButton galerie={galerie} role={role} user={user} />
        </Container>
    );
};

export default ButtonsContainer;
