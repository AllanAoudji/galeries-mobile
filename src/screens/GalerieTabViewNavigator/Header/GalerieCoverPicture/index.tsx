import * as React from 'react';
import { useSelector } from 'react-redux';
import {
    selectCurrentGalerieCoverPictureId,
    selectGaleriePicture,
} from '#store/galeriePictures';
import { selectCurrentGalerie } from '#store/galeries';

import CoverPicture from './CoverPicture';
import DefaultCoverPicture from './DefaultCoverPicture';
import NotFoundCoverPicture from './NotFoundCoverPicture';

const GalerieCoverPicture = () => {
    const coverPictureId = useSelector(selectCurrentGalerieCoverPictureId);
    const coverPictureSelector = React.useMemo(
        () => selectGaleriePicture(coverPictureId),
        [coverPictureId]
    );
    const coverPicture = useSelector(coverPictureSelector);
    const galerie = useSelector(selectCurrentGalerie);

    if (coverPicture) return <CoverPicture galeriePicture={coverPicture} />;
    if (galerie) return <DefaultCoverPicture galerie={galerie} />;
    return <NotFoundCoverPicture />;
};

export default GalerieCoverPicture;
