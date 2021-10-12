import * as React from 'react';
import { Image } from 'react-native';

type Props = {
    galeriePicture: Store.Models.GaleriePicture;
};

const CoverPicture = ({ galeriePicture }: Props) => {
    return (
        <Image
            style={{
                height: '100%',
                width: '100%',
            }}
            source={{ uri: galeriePicture.cropedImage.cachedSignedUrl }}
        />
    );
};

export default CoverPicture;
