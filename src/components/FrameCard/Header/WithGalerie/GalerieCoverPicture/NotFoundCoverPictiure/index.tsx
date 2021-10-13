import { LinearGradientPoint } from 'expo-linear-gradient';
import * as React from 'react';
import { useTheme } from 'styled-components/native';

import { LinearGradientStyled } from './styles';

const NotFoundCoverPicture = () => {
    const theme = useTheme();

    const colors = React.useMemo(
        () => [theme.colors.primary, theme.colors.tertiary],
        []
    );
    const end: LinearGradientPoint = React.useMemo(() => [0.8, 0.8], []);
    const start: LinearGradientPoint = React.useMemo(() => [0.2, 0.2], []);

    return <LinearGradientStyled colors={colors} end={end} start={start} />;
};

export default React.memo(NotFoundCoverPicture);
