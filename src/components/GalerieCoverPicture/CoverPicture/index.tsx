import * as React from 'react';

import { ImageStyled } from './styles';

type Props = {
    galeriePicture: Store.Models.GaleriePicture;
    size: number;
};

const CoverPicture = ({ galeriePicture, size }: Props) => {
    const source = React.useMemo(
        () => ({
            uri: galeriePicture.cropedImage.cachedSignedUrl,
        }),
        [galeriePicture]
    );

    return <ImageStyled size={size} source={source} />;
};

export default React.memo(CoverPicture);
