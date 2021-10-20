import { LinearGradientPoint } from 'expo-linear-gradient';
import * as React from 'react';
import { useTheme } from 'styled-components';

import { LinearGradientStyled } from './styles';

type Props = {
    size: number;
};

const NotFoundCoverPicture = ({ size }: Props) => {
    const theme = useTheme();

    const colors = React.useMemo(
        () => [theme.colors.primary, theme.colors.tertiary],
        []
    );
    const end: LinearGradientPoint = React.useMemo(() => [0.8, 0.8], []);
    const start: LinearGradientPoint = React.useMemo(() => [0.2, 0.2], []);

    return (
        <LinearGradientStyled
            colors={colors}
            end={end}
            size={size}
            start={start}
        />
    );
};

export default React.memo(NotFoundCoverPicture);
