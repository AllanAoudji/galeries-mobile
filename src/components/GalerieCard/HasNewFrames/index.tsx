import * as React from 'react';

import { Container } from './styles';
import Pictogram from '#components/Pictogram';

type Props = {
    galerie: Store.Models.Galerie;
};

const HasNewFrames = ({ galerie }: Props) => {
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
