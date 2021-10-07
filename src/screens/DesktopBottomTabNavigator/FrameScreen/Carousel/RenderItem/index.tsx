import * as React from 'react';
import { useSelector } from 'react-redux';
import { ImageSourcePropType, useWindowDimensions } from 'react-native';

import { selectGaleriePicture } from '#store/galeriePictures';

import { Container, ImageStyled } from './styles';

type Props = {
    item: string;
    onPress: () => void;
};

const RenderItem = ({ item, onPress }: Props) => {
    const dimension = useWindowDimensions();

    const galeriePictureSelector = React.useMemo(
        () => selectGaleriePicture(item),
        [item]
    );
    const galeriePicture = useSelector(galeriePictureSelector);

    const source: ImageSourcePropType = React.useMemo(
        () => ({
            uri: galeriePicture.originalImage.cachedSignedUrl,
        }),
        [galeriePicture]
    );

    return (
        <Container onPress={onPress} width={dimension.width}>
            <ImageStyled
                height={dimension.height}
                resizeMode="contain"
                source={source}
                width={dimension.width}
            />
        </Container>
    );
};

export default RenderItem;
