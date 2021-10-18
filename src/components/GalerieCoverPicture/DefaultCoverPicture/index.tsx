import { LinearGradientPoint } from 'expo-linear-gradient';
import * as React from 'react';
import normalizeDefaultCoverPicture from '#helpers/normalizeDefaultCoverPicture';

import { LinearGradientStyled } from './style';

type Props = {
    galerie: Store.Models.Galerie;
    size: number;
};

const DefaultCoverPicture = ({ galerie, size }: Props) => {
    const defaultCoverPictureNormalized = React.useMemo(
        () => normalizeDefaultCoverPicture(galerie.defaultCoverPicture),
        [galerie]
    );
    const end: LinearGradientPoint = React.useMemo(
        () => [
            defaultCoverPictureNormalized.endX,
            defaultCoverPictureNormalized.endY,
        ],
        [defaultCoverPictureNormalized]
    );
    const start: LinearGradientPoint = React.useMemo(
        () => [
            defaultCoverPictureNormalized.startX,
            defaultCoverPictureNormalized.startY,
        ],
        [defaultCoverPictureNormalized]
    );

    return (
        <LinearGradientStyled
            colors={defaultCoverPictureNormalized.colors}
            end={end}
            size={size}
            start={start}
        />
    );
};

export default React.memo(DefaultCoverPicture);
