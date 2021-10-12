import * as React from 'react';
import {
    ImageSourcePropType,
    Pressable,
    useWindowDimensions,
} from 'react-native';
import { useSelector } from 'react-redux';

import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from 'styled-components';
import CoverPictureBookMark from '#components/CoverPictureBookMark';
import { selectGaleriePicture } from '#store/galeriePictures';

import { BookMarkContainer, ImageStyled } from './styled';

type Props = {
    frame: Store.Models.Frame;
    galeriePictureId: string;
    onPress: () => void;
};

const Image = ({ frame, galeriePictureId, onPress }: Props) => {
    const theme = useTheme();
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
    const cols = React.useMemo(() => {
        const defaultColors = [theme.colors.primary, theme.colors.tertiary];
        if (!galeriePicture) return defaultColors;
        const colors = galeriePicture.pendingHexes.split(',');
        if (colors.length < 2) return defaultColors;
        return colors;
    }, [galeriePicture]);

    if (!galeriePicture)
        return (
            <LinearGradient
                colors={[theme.colors.primary, theme.colors.tertiary]}
                style={{ width: dimension.width, height: dimension.width }}
            />
        );

    return (
        <Pressable
            style={{ width: dimension.width, height: dimension.width }}
            onPress={onPress}
        >
            <LinearGradient
                colors={cols}
                style={{ width: '100%', height: '100%' }}
            >
                <ImageStyled source={source} />
                <BookMarkContainer>
                    <CoverPictureBookMark
                        frame={frame}
                        galeriePicture={galeriePicture}
                    />
                </BookMarkContainer>
            </LinearGradient>
        </Pressable>
    );
};

export default Image;
