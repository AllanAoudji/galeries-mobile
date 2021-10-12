import * as React from 'react';
import { ImageSourcePropType, useWindowDimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { useTheme } from 'styled-components';

import { selectGaleriePicture } from '#store/galeriePictures';

import { ImageStyled, LinearGradientStyled } from './styled';

type Props = {
    galeriePictureId: string;
};

const Image = ({ galeriePictureId }: Props) => {
    const dimension = useWindowDimensions();
    const theme = useTheme();

    const galeriePictureSelector = React.useMemo(
        () => selectGaleriePicture(galeriePictureId),
        [galeriePictureId]
    );
    const galeriePicture = useSelector(galeriePictureSelector);

    const cols = React.useMemo(() => {
        const defaultColors = [theme.colors.primary, theme.colors.tertiary];
        if (!galeriePicture) return defaultColors;
        const colors = galeriePicture.pendingHexes.split(',');
        if (colors.length < 2) return defaultColors;
        return colors;
    }, [galeriePicture]);
    const source: ImageSourcePropType = React.useMemo(
        () => ({
            uri: galeriePicture
                ? galeriePicture.cropedImage.cachedSignedUrl
                : '',
        }),
        []
    );

    return (
        <LinearGradientStyled colors={cols} size={dimension.width}>
            <ImageStyled size={dimension.width} source={source} />
        </LinearGradientStyled>
    );
};

export default React.memo(Image);
