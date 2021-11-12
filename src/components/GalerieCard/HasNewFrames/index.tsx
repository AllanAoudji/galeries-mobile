import * as React from 'react';

import Pictogram from '#components/Pictogram';

import { Container } from './styles';

type Props = {
    galerie: Store.Models.Galerie;
};

const HasNewFrames = ({ galerie }: Props) => {
    console.log(galerie);
    if (!galerie.hasNewFrames) return null;

    return (
        <Container>
            <Pictogram
                color="secondary-light"
                mr="small"
                mt="smallest"
                size="small"
                variant="new"
            />
        </Container>
    );
};

export default HasNewFrames;
