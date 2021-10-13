import * as React from 'react';
import { ImageSourcePropType, useWindowDimensions } from 'react-native';

import { ImageStyled } from './styles';

type Props = {
    galeriePicture?: Store.Models.GaleriePicture;
};

const GaleriePicture = ({ galeriePicture }: Props) => {
    const dimension = useWindowDimensions();

    const source: ImageSourcePropType = React.useMemo(
        () => ({
            uri: galeriePicture
                ? galeriePicture.cropedImage.cachedSignedUrl
                : '',
        }),
        []
    );

    return <ImageStyled size={dimension.width} source={source} />;
};

export default React.memo(GaleriePicture);
