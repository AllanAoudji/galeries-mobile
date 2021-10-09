import { LinearGradient } from 'expo-linear-gradient';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectGalerieCoverPictureId } from '#store/galeriePictures';
import { GLOBAL_STYLE } from '#helpers/constants';
import normalizeDefaultCoverPicture from '#helpers/normalizeDefaultCoverPicture';

import CoverPicture from './CoverPicture';

type Props = {
    galerie: Store.Models.Galerie;
};

const DefaultCoverPicture = ({ galerie }: Props) => {
    const coverPictureIdSelector = React.useMemo(
        () => selectGalerieCoverPictureId(galerie.id),
        [galerie]
    );
    const coverPictureId = useSelector(coverPictureIdSelector);

    const defaultCoverPictureNormalized = React.useMemo(
        () => normalizeDefaultCoverPicture(galerie.defaultCoverPicture),
        [galerie]
    );

    if (!coverPictureId)
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
                    borderRadius: 5,
                    height: GLOBAL_STYLE.FRAME_COVER_PICTURE_SIZE,
                    width: GLOBAL_STYLE.FRAME_COVER_PICTURE_SIZE,
                }}
            />
        );
    return <CoverPicture />;
};

export default DefaultCoverPicture;
