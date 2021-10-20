import * as React from 'react';

import { Typography } from '#components';

import { Container } from './styles';

type Props = {
    galerie?: Store.Models.Galerie;
};

const Footer = ({ galerie }: Props) => {
    if (!galerie || !galerie.description) return null;

    return (
        <Container>
            <Typography fontSize={14}>{galerie.description}</Typography>
        </Container>
    );
};

export default Footer;
