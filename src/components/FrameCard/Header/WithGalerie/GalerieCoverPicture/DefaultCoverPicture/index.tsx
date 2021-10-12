import { LinearGradientPoint } from 'expo-linear-gradient';
import * as React from 'react';
import normalizeDefaultCoverPicture from '#helpers/normalizeDefaultCoverPicture';

import { LinearGradientStyled } from './styles';

type Props = {
    galerie: Store.Models.Galerie;
};

const DefaultCoverPicture = ({ galerie }: Props) => {
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
            start={start}
        />
    );
};

export default React.memo(DefaultCoverPicture);
