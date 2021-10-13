import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { useTheme } from 'styled-components';

import { selectGaleriePicture } from '#store/galeriePictures';

import BookMark from './BookMark';
import GaleriePicture from './GaleriePicture';

import { LinearGradientStyled } from './styled';

type Props = {
    frame: Store.Models.Frame;
    galeriePictureId: string;
};

const RenderItem = ({ galeriePictureId, frame }: Props) => {
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

    return (
        <LinearGradientStyled colors={cols} size={dimension.width}>
            <GaleriePicture galeriePicture={galeriePicture} />
            <BookMark galeriePictureId={galeriePictureId} frame={frame} />
        </LinearGradientStyled>
    );
};

export default React.memo(RenderItem);