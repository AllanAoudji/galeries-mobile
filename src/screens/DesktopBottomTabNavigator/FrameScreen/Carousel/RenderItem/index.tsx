import * as React from 'react';
import { useSelector } from 'react-redux';
import { ImageSourcePropType, useWindowDimensions, View } from 'react-native';

import { CoverPictureBookMark } from '#components';
import {
    selectGalerieCoverPictureId,
    selectGaleriePicture,
} from '#store/galeriePictures';

import { Container, ImageStyled } from './styles';

type Props = {
    frame: Store.Models.Frame;
    item: string;
    onPress: () => void;
};

const RenderItem = ({ frame, item, onPress }: Props) => {
    const dimension = useWindowDimensions();

    const coverPictureIdSelector = React.useMemo(
        () => selectGalerieCoverPictureId(frame.galerieId),
        [frame]
    );
    const coverPictureId = useSelector(coverPictureIdSelector);

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
            <View
                style={{
                    position: 'absolute',
                    left: 15,
                    bottom: 45,
                }}
            >
                <CoverPictureBookMark
                    frame={frame}
                    galeriePictureId={item}
                    coverPictureId={coverPictureId}
                />
            </View>
        </Container>
    );
};

export default React.memo(RenderItem);
