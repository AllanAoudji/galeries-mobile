import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Pressable, useWindowDimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components';

import { selectGaleriePicture } from '#store/galeriePictures';

import BookMark from './BookMark';
import GaleriePicture from './GaleriePicture';

import { LinearGradientStyled } from './styled';
import { updateFramesCurrent } from '#store/frames';

type Props = {
    frame: Store.Models.Frame;
    galeriePictureId: string;
};

const RenderItem = ({ galeriePictureId, frame }: Props) => {
    const dispatch = useDispatch();
    const navigation = useNavigation<
        | Screen.DesktopBottomTab.FrameProp
        | Screen.DesktopBottomTab.HomeNavigationProp
    >();
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

    const handlePress = React.useCallback(() => {
        dispatch(updateFramesCurrent(frame.id));
        navigation.navigate('Frame');
    }, [frame]);

    return (
        <LinearGradientStyled colors={cols} size={dimension.width}>
            <Pressable onPress={handlePress}>
                <GaleriePicture galeriePicture={galeriePicture} />
                <BookMark galeriePictureId={galeriePictureId} frame={frame} />
            </Pressable>
        </LinearGradientStyled>
    );
};

export default React.memo(RenderItem);
