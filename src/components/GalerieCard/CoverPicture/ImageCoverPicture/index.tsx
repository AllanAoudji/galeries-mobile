import * as React from 'react';
import { useWindowDimensions } from 'react-native';

import { Container, ImageStyled } from './styles';

type Props = {
    galeriePicture: Store.Models.GaleriePicture;
};

const ImageCoverPicture = ({ galeriePicture }: Props) => {
    const dimension = useWindowDimensions();

    const source = React.useMemo(
        () => ({
            uri: galeriePicture.cropedImage.cachedSignedUrl,
        }),
        [galeriePicture]
    );

    return (
        <Container width={dimension.width}>
            <ImageStyled size={dimension.width} source={source} />
        </Container>
    );
};

export default ImageCoverPicture;
