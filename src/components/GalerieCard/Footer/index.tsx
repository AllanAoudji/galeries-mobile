import * as React from 'react';

import Typography from '#components/Typography';

import { Container } from './styles';

type Props = {
    galerie: Store.Models.Galerie;
};

const Footer = ({ galerie }: Props) => {
    return (
        <Container>
            <Typography fontSize={18} textAlign="right">
                {galerie.name}
            </Typography>
        </Container>
    );
};

export default Footer;
