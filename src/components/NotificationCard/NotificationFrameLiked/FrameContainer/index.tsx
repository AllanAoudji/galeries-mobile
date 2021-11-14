import * as React from 'react';
import { useSelector } from 'react-redux';
import { Image } from 'react-native';
import {
    selectFrameGaleriePicturesAllIds,
    selectGaleriePicture,
} from '#store/galeriePictures';

type Props = {
    frame?: Store.Models.Frame;
};

const FrameContainer = ({ frame }: Props) => {
    const galeriePicturesSelector = React.useMemo(
        () => selectFrameGaleriePicturesAllIds(frame ? frame.id : null),
        [frame]
    );
    const galeriePictures = useSelector(galeriePicturesSelector);
    const galeriePictureSelector = React.useMemo(
        () =>
            selectGaleriePicture(
                galeriePictures && galeriePictures[0]
                    ? galeriePictures[0]
                    : null
            ),
        [galeriePictures]
    );
    const galeriePicture = useSelector(galeriePictureSelector);

    if (!frame) return null;
    if (!galeriePicture) return null;

    return (
        <Image
            style={{ height: 50, width: 50 }}
            source={{ uri: galeriePicture.cropedImage.cachedSignedUrl }}
        />
    );
};

export default React.memo(FrameContainer);
