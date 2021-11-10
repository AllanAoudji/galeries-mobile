import moment from 'moment';
import * as React from 'react';

import { Typography } from '#components';

import { Container } from './styles';

type Props = {
    galerie: Store.Models.Galerie;
};

const CreatedAt = ({ galerie }: Props) => {
    return (
        <Container>
            <Typography fontFamily="light">
                Created there is {moment(galerie.createdAt).fromNow()}.
            </Typography>
        </Container>
    );
};

export default React.memo(CreatedAt);
