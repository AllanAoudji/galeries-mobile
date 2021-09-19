import * as React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components/native';

import { Container } from './styles';

type Props = {
    backgroundColor?: keyof Style.Colors;
    color?: keyof Style.Colors;
    show: boolean;
};

const FullScreenLoader = ({
    color = 'primary',
    backgroundColor = 'secondary-light',
    show,
}: Props) => {
    const theme = useTheme();

    if (!show) return null;

    return (
        <Container color={backgroundColor}>
            <ActivityIndicator
                color={theme.colors[color]}
                size="large"
                style={{ transform: [{ scale: 1.2 }] }}
            />
        </Container>
    );
};

export default FullScreenLoader;
