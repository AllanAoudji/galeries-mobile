import * as React from 'react';
import styled from 'styled-components/native';

import Typography from '#components/Typography';

type Props = {
    pb?: number;
    pt?: number;
    text: string;
};
type ContainerProps = {
    pb?: number;
    pt?: number;
};

const Container = styled.View<ContainerProps>`
    flex: 1;
    justify-content: center;
    padding: ${({ pb, pt, theme }) =>
        `${pt || 0}px ${theme.spacings.normal} ${pb || 0}px`};
`;

const EmptyMessage = ({ pb, pt, text }: Props) => {
    return (
        <Container pb={pb} pt={pt}>
            <Typography
                color="primary"
                fontSize={14}
                fontFamily="light"
                textAlign="center"
            >
                {text}
            </Typography>
        </Container>
    );
};

export default EmptyMessage;
