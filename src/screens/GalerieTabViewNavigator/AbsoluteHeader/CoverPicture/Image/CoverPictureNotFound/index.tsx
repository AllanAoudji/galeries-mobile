import { LinearGradientPoint } from 'expo-linear-gradient';
import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import { useTheme } from 'styled-components';

import { Container } from './styles';

const CoverPictureNotFound = () => {
    const theme = useTheme();
    const dimension = useWindowDimensions();

    const colors = React.useMemo(
        () => [theme.colors.primary, theme.colors.tertiary],
        []
    );
    const end: LinearGradientPoint = React.useMemo(() => [0.8, 0.8], []);
    const start: LinearGradientPoint = React.useMemo(() => [0.2, 0.2], []);

    return (
        <Container
            colors={colors}
            end={end}
            size={dimension.width}
            start={start}
        />
    );
};

export default CoverPictureNotFound;
