import * as React from 'react';

import { useWindowDimensions } from 'react-native';
import CachedImage from '#components/CachedImage';

import Container from './Container';

type Props = {
    galeriePicture: Store.Models.GaleriePicture;
};

const Image = ({ galeriePicture }: Props) => {
    const dimensions = useWindowDimensions();

    return (
        <Container colors={galeriePicture.pendingHexes}>
            <CachedImage
                height={dimensions.width}
                id={galeriePicture.cropedImage.id}
                uri={galeriePicture.cropedImage.signedUrl}
                width={dimensions.width}
            />
        </Container>
    );
};

export default Image;
