import * as React from 'react';

import { Typography } from '#components';

import { Container } from './style';

type Props = {
    galerie: Store.Models.Galerie;
};

const Title = ({ galerie }: Props) => {
    return (
        <Container>
            <Typography color="danger" fontSize={24}>
                Delete galerie{' '}
                <Typography color="danger" fontFamily="bold" fontSize={24}>
                    {galerie.name}
                </Typography>
                ?
            </Typography>
        </Container>
    );
};

export default Title;
