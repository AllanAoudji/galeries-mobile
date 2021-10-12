import * as React from 'react';
import { useSelector } from 'react-redux';

import { selectGalerieStatus } from '#store/galeries';
import {
    selectGalerieCoverPictureId,
    selectGalerieCoverPictureStatus,
    selectGaleriePicture,
} from '#store/galeriePictures';

import CoverPicture from './CoverPicture';
import DefaultCoverPicture from './DefaultCoverPicture';
import NotFoundCoverPicture from './NotFoundCoverPictiure';

type Props = {
    galerie: Store.Models.Galerie;
};

const GalerieCoverPicture = ({ galerie }: Props) => {
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
    const galerieStatusSelector = React.useMemo(
        () => selectGalerieStatus(galerie.id),
        [galerie]
    );
    const galerieStatus = useSelector(galerieStatusSelector);

    if (galerieStatus !== 'SUCCESS' && galerieCoverPictureStatus !== 'SUCCESS')
        return <NotFoundCoverPicture />;
    if (!galeriePicture) return <DefaultCoverPicture galerie={galerie} />;
    return <CoverPicture galeriePicture={galeriePicture} />;
};

export default React.memo(GalerieCoverPicture);
