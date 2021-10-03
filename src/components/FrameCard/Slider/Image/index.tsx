import * as React from 'react';
import { useSelector } from 'react-redux';
import { ImageSourcePropType } from 'react-native';

import { selectGaleriePicture } from '#store/galeriePictures';

import Container from './Container';

import { ImageStyled } from './styled';

type Props = {
    galeriePictureId: string;
};

const Image = ({ galeriePictureId }: Props) => {
    const galeriePictureSelector = React.useMemo(
        () => selectGaleriePicture(galeriePictureId),
        [galeriePictureId]
    );
    const galeriePicture = useSelector(galeriePictureSelector);

    const source: ImageSourcePropType = React.useMemo(
        () => ({
            uri: galeriePicture.cropedImage.cachedSignedUrl,
        }),
        [galeriePicture]
    );

    return (
        <Container colors={galeriePicture.pendingHexes}>
            <ImageStyled source={source} />
        </Container>
    );
};

export default Image;
