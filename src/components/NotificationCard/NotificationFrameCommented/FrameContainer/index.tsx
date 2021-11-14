import * as React from 'react';
import { useSelector } from 'react-redux';
import {
    selectFrameGaleriePicturesAllIds,
    selectGaleriePicture,
} from '#store/galeriePictures';

import { ImageStyled } from './styles';

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

    const source = React.useMemo(
        () => ({
            uri: galeriePicture
                ? galeriePicture.cropedImage.cachedSignedUrl
                : '',
        }),
        [galeriePictures]
    );

    if (!frame) return null;
    if (!galeriePicture) return null;

    return <ImageStyled source={source} />;
};

export default React.memo(FrameContainer);
