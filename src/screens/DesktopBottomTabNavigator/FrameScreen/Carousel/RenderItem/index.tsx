import * as React from 'react';
import { useSelector } from 'react-redux';
import { ImageSourcePropType, useWindowDimensions } from 'react-native';

import { selectGaleriePicture } from '#store/galeriePictures';

import BookMark from './BookMark';

import { Container, ImageStyled } from './styles';

type Props = {
    frame: Store.Models.Frame;
    item: string;
    onPress: () => void;
};

const RenderItem = ({ frame, item, onPress }: Props) => {
    const dimension = useWindowDimensions();

    const galeriePictureSelector = React.useMemo(
        () => selectGaleriePicture(item),
        [item]
    );
    const galeriePicture = useSelector(galeriePictureSelector);

    const source: ImageSourcePropType = React.useMemo(
        () => ({
            uri: galeriePicture
                ? galeriePicture.originalImage.cachedSignedUrl
                : '',
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
            <BookMark frame={frame} galeriePictureId={item} />
        </Container>
    );
};

export default React.memo(RenderItem);
