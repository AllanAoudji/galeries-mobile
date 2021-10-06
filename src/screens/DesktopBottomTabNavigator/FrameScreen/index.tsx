import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components/native';

import { resetFramesCurrent, selectCurrentFrame } from '#store/frames';
import { selectFrameGaleriePicturesAllIds } from '#store/galeriePictures';

import { Container } from './styles';
import { Typography } from '#components';

type Props = {
    navigation: Screen.DesktopBottomTab.FrameProp;
};

const FrameScreen = ({ navigation }: Props) => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const currentFrame = useSelector(selectCurrentFrame);
    const galeriePicturesAllIdsSelector = React.useMemo(
        () =>
            selectFrameGaleriePicturesAllIds(
                currentFrame ? currentFrame.id : undefined
            ),
        [currentFrame]
    );
    const galeriePicturesAllIds = useSelector(galeriePicturesAllIdsSelector);

    React.useEffect(() => {
        if (!currentFrame) {
            if (navigation.canGoBack()) navigation.goBack();
            else navigation.navigate('Home');
        }
    }, [currentFrame]);

    useFocusEffect(
        React.useCallback(() => () => dispatch(resetFramesCurrent()), [])
    );

    return (
        <Container>
            {galeriePicturesAllIds ? (
                <Typography color="white">frames</Typography>
            ) : (
                <ActivityIndicator color={theme.colors.white} />
            )}
        </Container>
    );
};

export default FrameScreen;
