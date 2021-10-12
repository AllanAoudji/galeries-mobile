import * as React from 'react';
import { useSelector } from 'react-redux';
import {
    ImageSourcePropType,
    Pressable,
    useWindowDimensions,
} from 'react-native';

import { selectGaleriePicture } from '#store/galeriePictures';

import BookMark from './BookMark';

import { ImageStyled } from './styled';

type Props = {
    frame: Store.Models.Frame;
    galeriePictureId: string;
    onPress: () => void;
};

const Image = ({ frame, galeriePictureId, onPress }: Props) => {
    const dimension = useWindowDimensions();
    const galeriePictureSelector = React.useMemo(
        () => selectGaleriePicture(galeriePictureId),
        [galeriePictureId]
    );
    const galeriePicture = useSelector(galeriePictureSelector);

    const source: ImageSourcePropType = React.useMemo(
        () => ({
            uri: galeriePicture
                ? galeriePicture.cropedImage.cachedSignedUrl
                : '',
        }),
        [galeriePicture]
    );

    if (!galeriePicture) return null;

    return (
        <Pressable
            style={{ width: dimension.width, height: dimension.width }}
            onPress={onPress}
        >
            <ImageStyled source={source} />
            <BookMark galeriePicture={galeriePicture} frame={frame} />
        </Pressable>
    );
};

export default Image;
