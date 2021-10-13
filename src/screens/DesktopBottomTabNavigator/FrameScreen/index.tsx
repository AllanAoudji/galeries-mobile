import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components/native';

import { selectCurrentFrame } from '#store/frames';
import {
    getFrameGaleriePictures,
    selectFrameGaleriePicturesAllIds,
    selectFrameGaleriePicturesStatus,
} from '#store/galeriePictures';

import Carousel from './Carousel';
import Options from './Options';
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

    const [showOptions, setShowOptions] = React.useState<boolean>(false);

    const handleShowOptions = React.useCallback(() => setShowOptions(true), []);
    const handleHideOptions = React.useCallback(() => {
        setShowOptions(false);
    }, []);
    const handlePressBack = React.useCallback(() => {
        if (navigation.canGoBack()) navigation.goBack();
        else navigation.navigate('Home');
    }, []);

    React.useEffect(() => {
        if (
            (!galeriePicturesStatus ||
                galeriePicturesStatus.includes('LOADING')) &&
            currentFrame
        )
            dispatch(getFrameGaleriePictures(currentFrame.id));
    }, [currentFrame, galeriePicturesStatus]);

    useFocusEffect(
        React.useCallback(() => {
            if (!currentFrame) {
                if (navigation.canGoBack()) navigation.goBack();
                else navigation.navigate('Home');
            }
        }, [currentFrame])
    );
    useFocusEffect(React.useCallback(() => () => handleHideOptions(), []));

    if (!currentFrame) return null;

    return (
        <Container>
            {galeriePicturesAllIds ? (
                <Carousel
                    allIds={galeriePicturesAllIds}
                    onPress={handleShowOptions}
                />
            ) : (
                <ActivityIndicator color={theme.colors.black} />
            )}
            <Options
                description={currentFrame.description}
                frame={currentFrame}
                onPressBack={handlePressBack}
                onPress={handleHideOptions}
                show={showOptions}
            />
        </Container>
    );
};

export default FrameScreen;
