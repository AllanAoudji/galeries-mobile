import * as React from 'react';
import { useSelector } from 'react-redux';
import { ImageSourcePropType } from 'react-native';

import { selectGaleriePicture } from '#store/galeriePictures';

import Container from './Container';

import { ImageStyled } from './styled';

type Props = {
    galeriePictureId: string;
    onPress: () => void;
};

const Image = ({ galeriePictureId, onPress }: Props) => {
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
        <Container onPress={onPress} colors={galeriePicture.pendingHexes}>
            <ImageStyled source={source} />
        </Container>
    );
};

export default Image;
