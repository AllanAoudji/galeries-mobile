import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Pressable, useWindowDimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components/native';

import { updateFramesCurrent } from '#store/frames';
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
    const dispatch = useDispatch();
    const navigation = useNavigation<
        | Screen.DesktopBottomTab.FrameProp
        | Screen.DesktopBottomTab.HomeNavigationProp
    >();
    const theme = useTheme();

    const galeriePictureSelector = React.useMemo(
        () => selectGaleriePicture(galeriePictureId),
        [galeriePictureId]
    );
    const galeriePicture = useSelector(galeriePictureSelector);

    const colors = React.useMemo(() => {
        const defaultColors = [theme.colors.primary, theme.colors.tertiary];
        if (!galeriePicture) return defaultColors;
        const cols = galeriePicture.pendingHexes.split(',');
        if (cols.length < 2) return defaultColors;
        return cols;
    }, [galeriePicture]);

    const handlePress = React.useCallback(() => {
        dispatch(updateFramesCurrent(frame.id));
        navigation.navigate('Frame');
    }, [frame, navigation]);

    return (
        <LinearGradientStyled colors={colors} size={dimension.width}>
            <Pressable onPress={handlePress}>
                <GaleriePicture galeriePicture={galeriePicture} />
                <BookMark frame={frame} galeriePictureId={galeriePictureId} />
            </Pressable>
        </LinearGradientStyled>
    );
};

export default React.memo(RenderItem);
