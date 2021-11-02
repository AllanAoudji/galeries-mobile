import * as React from 'react';

import Typography from '#components/Typography';

import { Button, Container } from './styles';

type Props = {
    pb?: number;
    pt?: number;
    onPressRefreshButton?: () => void;
    text: string;
};

const EmptyMessage = ({ pb, pt, onPressRefreshButton, text }: Props) => {
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
            <Button>
                <Typography color="primary" fontFamily="light">
                    refresh
                </Typography>
            </Button>
        </Container>
    );
};

export default EmptyMessage;
