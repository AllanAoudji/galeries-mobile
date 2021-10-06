import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components/native';

import { resetFramesCurrent, selectCurrentFrame } from '#store/frames';
import {
    getFrameGaleriePictures,
    selectFrameGaleriePicturesAllIds,
    selectFrameGaleriePicturesStatus,
} from '#store/galeriePictures';

import Carousel from './Carousel';
import { Container } from './styles';

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
    const galeriePicturesStatusSelector = React.useMemo(
        () =>
            selectFrameGaleriePicturesStatus(
                currentFrame ? currentFrame.id : undefined
            ),
        [currentFrame]
    );
    const galeriePicturesStatus = useSelector(galeriePicturesStatusSelector);

    React.useEffect(() => {
        if (!currentFrame) {
            if (navigation.canGoBack()) navigation.goBack();
            else navigation.navigate('Home');
        }
    }, [currentFrame]);
    React.useEffect(() => {
        if (
            (!galeriePicturesStatus ||
                galeriePicturesStatus.includes('LOADING')) &&
            currentFrame
        )
            dispatch(getFrameGaleriePictures(currentFrame.id));
    }, [currentFrame, galeriePicturesStatus]);

    useFocusEffect(
        React.useCallback(() => () => dispatch(resetFramesCurrent()), [])
    );

    return (
        <Container>
            {galeriePicturesAllIds ? (
                <Carousel allIds={galeriePicturesAllIds} />
            ) : (
                <ActivityIndicator color={theme.colors.black} />
            )}
        </Container>
    );
};

export default FrameScreen;
