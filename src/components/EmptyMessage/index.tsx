import * as React from 'react';

import Typography from '#components/Typography';

import { Container } from './styles';

type Props = {
    pb?: number;
    pt?: number;
    text: string;
};

const EmptyMessage = ({ pb, pt, text }: Props) => {
    return (
        <Container pb={pb} pt={pt}>
            <Typography
                color="primary"
                fontFamily="light"
                fontSize={14}
                textAlign="center"
            >
                {text}
            </Typography>
        </Container>
    );
};

export default React.memo(EmptyMessage);
