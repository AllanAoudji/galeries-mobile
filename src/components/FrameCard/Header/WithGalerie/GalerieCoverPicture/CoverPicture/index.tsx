import * as React from 'react';

import { ImageStyled } from './styles';

type Props = {
    galeriePicture: Store.Models.GaleriePicture;
};

const CoverPicture = ({ galeriePicture }: Props) => {
    const source = React.useMemo(
        () => ({
            uri: galeriePicture.cropedImage.cachedSignedUrl,
        }),
        [galeriePicture]
    );

    return <ImageStyled source={source} />;
};

export default React.memo(CoverPicture);
