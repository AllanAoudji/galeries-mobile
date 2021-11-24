import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components/native';

import { getFrame, selectCurrentFrame } from '#store/frames';
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

    const [currentIndex, setCurrentIndex] = React.useState<number>(0);
    const [initialLoading, setInitialLoading] = React.useState<boolean>(true);
    const [showOptions, setShowOptions] = React.useState<boolean>(false);

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

    const handleHideOptions = React.useCallback(() => {
        setShowOptions(false);
    }, []);
    const handlePressBack = React.useCallback(() => {
        if (navigation.canGoBack()) navigation.goBack();
        else navigation.navigate('Home');
    }, [navigation]);
    const handleShowOptions = React.useCallback(() => setShowOptions(true), []);

    React.useEffect(() => {
        if (!currentFrame) return;
        if (galeriePicturesAllIds) return;
        if (galeriePicturesStatus && galeriePicturesStatus.includes('LOADING'))
            return;
        dispatch(getFrameGaleriePictures(currentFrame.id));
    }, [currentFrame, galeriePicturesAllIds, galeriePicturesStatus]);

    useFocusEffect(
        React.useCallback(() => {
            if (!currentFrame) return;
            if (!initialLoading) return;
            setInitialLoading(false);
            dispatch(getFrame(currentFrame.id));
        }, [currentFrame, initialLoading])
    );
    useFocusEffect(
        React.useCallback(() => {
            if (currentFrame) return;
            if (navigation.canGoBack()) navigation.goBack();
            else navigation.navigate('Home');
        }, [currentFrame])
    );
    useFocusEffect(
        React.useCallback(
            () => () => {
                handleHideOptions();
                setCurrentIndex(0);
                setInitialLoading(true);
            },
            []
        )
    );

    if (!currentFrame) return null;

    return (
        <Container>
            {galeriePicturesAllIds ? (
                <Carousel
                    allIds={galeriePicturesAllIds}
                    currentIndex={currentIndex}
                    frame={currentFrame}
                    onPress={handleShowOptions}
                    setCurrentIndex={setCurrentIndex}
                />
            ) : (
                <ActivityIndicator color={theme.colors.black} />
            )}
            <Options
                currentIndex={currentIndex}
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
