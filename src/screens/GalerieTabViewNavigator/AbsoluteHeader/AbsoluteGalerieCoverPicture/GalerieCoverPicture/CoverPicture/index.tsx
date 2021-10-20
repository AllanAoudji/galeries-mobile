import * as React from 'react';
import { useWindowDimensions } from 'react-native';

import { ImageStyled } from './styles';

type Props = {
    galeriePicture: Store.Models.GaleriePicture;
};

const CoverPicture = ({ galeriePicture }: Props) => {
    const dimension = useWindowDimensions();

    const source = React.useMemo(
        () => ({
            uri: galeriePicture.cropedImage.cachedSignedUrl,
        }),
        [galeriePicture]
    );

    return <ImageStyled size={dimension.width} source={source} />;
};

export default CoverPicture;
