import * as React from 'react';
import { Image } from 'react-native';
import { useSelector } from 'react-redux';
import { selectGaleriePicture } from '#store/galeriePictures';
import { GLOBAL_STYLE } from '#helpers/constants';

type Props = {
    coverPictureId: string;
};

const CoverPicture = ({ coverPictureId }: Props) => {
    const galeriePictureSelector = React.useMemo(
        () => selectGaleriePicture(coverPictureId),
        [coverPictureId]
    );
    const galeriePicture = useSelector(galeriePictureSelector);

    return (
        <Image
            style={{
                height: GLOBAL_STYLE.FRAME_COVER_PICTURE_SIZE,
                width: GLOBAL_STYLE.FRAME_COVER_PICTURE_SIZE,
                borderRadius: 5,
            }}
            source={{ uri: galeriePicture.cropedImage.cachedSignedUrl }}
        />
    );
};

export default CoverPicture;
