import * as React from 'react';
import { useSelector } from 'react-redux';
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

    return (
        <Container colors={galeriePicture.pendingHexes}>
            <ImageStyled
                source={{ uri: galeriePicture.cropedImage.cachedSignedUrl }}
            />
        </Container>
    );
};

export default Image;
