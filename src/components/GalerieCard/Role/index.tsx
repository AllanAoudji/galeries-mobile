import * as React from 'react';

import Pictogram from '#components/Pictogram';

import { Container } from './styles';

type Props = {
    galerie: Store.Models.Galerie;
};

const Role = ({ galerie }: Props) => {
    if (galerie.role === 'user') return null;

    return (
        <Container>
            <Pictogram
                color="secondary-light"
                mt="smallest"
                ml="small"
                variant={
                    galerie.role === 'admin' ? 'admin-role' : 'moderator-role'
                }
            />
        </Container>
    );
};

export default Role;
