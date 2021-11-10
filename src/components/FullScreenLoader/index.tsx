import * as React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from 'styled-components/native';

import { Container } from './styles';

type Props = {
    backgroundColor?: keyof Style.Colors;
    color?: keyof Style.Colors;
    show: boolean;
};

const FullScreenLoader = ({
    backgroundColor = 'secondary-light',
    color = 'primary',
    show,
}: Props) => {
    const theme = useTheme();

    if (!show) return null;

    return (
        <Container color={backgroundColor}>
            <ActivityIndicator
                color={theme.colors[color]}
                size="large"
                style={style.activityIndicator}
            />
        </Container>
    );
};

const style = StyleSheet.create({
    activityIndicator: {
        transform: [{ scale: 1.2 }],
    },
});

export default React.memo(FullScreenLoader);
