import * as React from 'react';
import {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import { useTheme } from 'styled-components/native';

import { AddButton } from '#components';
import { BottomSheetContext } from '#contexts/BottomSheetContext';
import { selectProfilePicturesLoadingPost } from '#store/profilePictures';

import NavigateCameraButton from './NavigateCameraButton';
import NavigateGalleryButton from './NavigateGalleryButton';
import convertPixelToNum from '#helpers/convertPixelToNum';

import { Container } from './styles';
import { ANIMATIONS } from '#helpers/constants';

const SIZE = 50;

const AddProfilePictureButton = () => {
    const { openBottomSheet } = React.useContext(BottomSheetContext);
    const theme = useTheme();

    const finalBottomPosition = React.useMemo(
        () => convertPixelToNum(theme.spacings.largest),
        [theme]
    );

    const loading = useSelector(selectProfilePicturesLoadingPost);

    const state = useSharedValue(loading === 'PENDING' ? 1 : 0);
    const style = useAnimatedStyle(() => {
        const bottom = interpolate(
            state.value,
            [0, 1],
            [-SIZE, finalBottomPosition]
        );
        return { bottom, transform: [{ scale: state.value }] };
    });

    const bottomSheetContainer = React.useCallback(() => {
        return (
            <>
                <NavigateCameraButton />
                <NavigateGalleryButton />
            </>
        );
    }, []);
    const handlePress = React.useCallback(() => {
        if (loading.includes('LOADING')) return;
        openBottomSheet(bottomSheetContainer);
    }, [bottomSheetContainer, openBottomSheet, loading]);

    React.useEffect(() => {
        if (loading === 'PENDING') {
            state.value = withTiming(1, ANIMATIONS.TIMING_CONFIG(600));
        } else {
            state.value = withTiming(0, ANIMATIONS.TIMING_CONFIG(600));
        }
    }, [loading]);

    return (
        <Container style={style}>
            <AddButton onPress={handlePress} />
        </Container>
    );
};

export default React.memo(AddProfilePictureButton);
