import * as React from 'react';
import { useSelector } from 'react-redux';

import {
    selectGalerieCoverPictureId,
    selectGalerieCoverPictureStatus,
    selectGaleriePicture,
} from '#store/galeriePictures';

import DefaultCoverPicture from './DefaultCoverPicture';
import ImageCoverPicture from './ImageCoverPicture';
import NotFoundCoverPicture from './NotFoundCoverPicture';

type Props = {
    galerie: Store.Models.Galerie;
};

const CoverPicture = ({ galerie }: Props) => {
    const coverPictureSelectorId = React.useMemo(
        () => selectGalerieCoverPictureId(galerie.id),
        [galerie]
    );
    const coverPictureId = useSelector(coverPictureSelectorId);

    const galerieCoverPictureStatusSelector = React.useMemo(
        () => selectGalerieCoverPictureStatus(galerie.id),
        [galerie]
    );
    const galerieCoverPictureStatus = useSelector(
        galerieCoverPictureStatusSelector
    );

    const galeriePictureSelector = React.useMemo(
        () => selectGaleriePicture(coverPictureId),
        [coverPictureId]
    );
    const galeriePicture = useSelector(galeriePictureSelector);

    if (galerieCoverPictureStatus !== 'SUCCESS')
        return <NotFoundCoverPicture />;
    if (!galeriePicture) return <DefaultCoverPicture galerie={galerie} />;
    return <ImageCoverPicture galeriePicture={galeriePicture} />;
};

export default CoverPicture;
