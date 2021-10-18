import * as React from 'react';
import { useSelector } from 'react-redux';

import {
    selectCurrentGalerieCoverPictureId,
    selectGaleriePicture,
} from '#store/galeriePictures';

import CoverPicture from './CoverPicture';
import NotFoundCoverPicture from './NotFoundCoverPicture';
import DefaultCoverPicture from './DefaultCoverPicture';

type Props = {
    galerie?: Store.Models.Galerie;
};

const GalerieCoverPicture = ({ galerie }: Props) => {
    const coverPictureId = useSelector(selectCurrentGalerieCoverPictureId);
    const coverPicture = useSelector(selectGaleriePicture(coverPictureId));

    if (coverPicture) return <CoverPicture galeriePicture={coverPicture} />;
    if (galerie) return <DefaultCoverPicture galerie={galerie} />;
    return <NotFoundCoverPicture />;
};

export default GalerieCoverPicture;
