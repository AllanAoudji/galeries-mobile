import { LinearGradient } from 'expo-linear-gradient';
import * as React from 'react';
import normalizeDefaultCoverPicture from '#helpers/normalizeDefaultCoverPicture';

type Props = {
    galerie: Store.Models.Galerie;
};

const DefaultCoverPicture = ({ galerie }: Props) => {
    const defaultCoverPictureNormalized = React.useMemo(
        () => normalizeDefaultCoverPicture(galerie.defaultCoverPicture),
        [galerie]
    );

    return (
        <LinearGradient
            colors={defaultCoverPictureNormalized.colors}
            end={[
                defaultCoverPictureNormalized.endX,
                defaultCoverPictureNormalized.endY,
            ]}
            start={[
                defaultCoverPictureNormalized.startX,
                defaultCoverPictureNormalized.startY,
            ]}
            style={{
                height: '100%',
                width: '100%',
            }}
        />
    );
};

export default DefaultCoverPicture;
