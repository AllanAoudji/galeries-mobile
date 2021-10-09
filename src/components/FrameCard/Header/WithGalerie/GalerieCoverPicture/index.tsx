import { LinearGradient, LinearGradientPoint } from 'expo-linear-gradient';
import * as React from 'react';
import { useTheme } from 'styled-components/native';
import { GLOBAL_STYLE } from '#helpers/constants';

import DefaultCoverPicture from './DefaultCoverPicture';

type Props = {
    galerie?: Store.Models.Galerie;
};

const GalerieCoverPicture = ({ galerie }: Props) => {
    const theme = useTheme();

    const defaultColor = React.useMemo(
        () => [theme.colors.primary, theme.colors.tertiary],
        []
    );
    const defaultEnd: LinearGradientPoint = React.useMemo(() => [0.8, 0.8], []);
    const defaultStart: LinearGradientPoint = React.useMemo(
        () => [0.2, 0.2],
        []
    );

    if (!galerie)
        return (
            <LinearGradient
                colors={defaultColor}
                end={defaultEnd}
                start={defaultStart}
                style={{
                    borderRadius: 5,
                    height: GLOBAL_STYLE.FRAME_COVER_PICTURE_SIZE,
                    width: GLOBAL_STYLE.FRAME_COVER_PICTURE_SIZE,
                }}
            />
        );
    return <DefaultCoverPicture galerie={galerie} />;
};

export default GalerieCoverPicture;
