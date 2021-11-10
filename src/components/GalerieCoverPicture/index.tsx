import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import { useSelector } from 'react-redux';

import {
    selectGalerieCoverPictureId,
    selectGaleriePicture,
} from '#store/galeriePictures';

import CoverPicture from './CoverPicture';
import DefaultCoverPicture from './DefaultCoverPicture';
import NotFoundCoverPicture from './NotFoundCoverPicture';

import { Container } from './styles';

type Props = {
    borderRadius?: number;
    galerie?: Store.Models.Galerie;
    height?: number;
    size?: number;
    width?: number;
};

const GalerieCoverPicture = ({
    borderRadius,
    galerie,
    height,
    size,
    width,
}: Props) => {
    const dimension = useWindowDimensions();

    const coverPictureIdSelector = React.useMemo(
        () => selectGalerieCoverPictureId(galerie ? galerie.id : null),
        [galerie]
    );
    const coverPictureId = useSelector(coverPictureIdSelector);
    const coverPictureSelector = React.useMemo(
        () => selectGaleriePicture(coverPictureId),
        [coverPictureId]
    );
    const coverPicture = useSelector(coverPictureSelector);

    const currentSize = React.useMemo(
        () => size || dimension.width,
        [dimension, size]
    );
    const content = React.useMemo(() => {
        if (coverPicture)
            return (
                <CoverPicture
                    galeriePicture={coverPicture}
                    size={currentSize}
                />
            );
        if (galerie)
            return <DefaultCoverPicture galerie={galerie} size={currentSize} />;
        return <NotFoundCoverPicture size={currentSize} />;
    }, [coverPicture, currentSize, galerie, size]);

    return (
        <Container
            borderRadius={borderRadius}
            height={height}
            size={currentSize}
            width={width}
        >
            {content}
        </Container>
    );
};

export default React.memo(GalerieCoverPicture);
