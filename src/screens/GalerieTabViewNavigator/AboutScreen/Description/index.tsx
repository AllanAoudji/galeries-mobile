import * as React from 'react';

import { Typography } from '#components';

import { Container, TitleContainer } from './styles';

type Props = {
    galerie: Store.Models.Galerie;
};

const Description = ({ galerie }: Props) => {
    if (!galerie.description) return null;

    return (
        <Container>
            <TitleContainer>
                <Typography>DESCRIPTION:</Typography>
            </TitleContainer>
            <Typography color="primary" fontFamily="bold">
                {galerie.description}
            </Typography>
        </Container>
    );
};

export default React.memo(Description);
