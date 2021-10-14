import { LinearGradientPoint } from 'expo-linear-gradient';
import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import { useTheme } from 'styled-components/native';

import { LinearGradientStyled } from './styles';

const NotFoundCoverPicture = () => {
    const dimension = useWindowDimensions();
    const theme = useTheme();

    const colors = React.useMemo(
        () => [theme.colors.primary, theme.colors.tertiary],
        []
    );
    const end: LinearGradientPoint = React.useMemo(() => [0.8, 0], []);
    const start: LinearGradientPoint = React.useMemo(() => [0, 0.8], []);

    return (
        <LinearGradientStyled
            colors={colors}
            end={end}
            start={start}
            width={dimension.width}
        />
    );
};

export default React.memo(NotFoundCoverPicture);
