import * as React from 'react';
import {
    interpolate,
    interpolateColor,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components/native';

import ImageLoader from '#components/ImageLoader';
import { CreateFrameContext } from '#contexts/CreateFrameContext';
import { ANIMATIONS } from '#helpers/constants';
import { resetFramesLoadingPost, selectFramesLoadingPost } from '#store/frames';

type Props = {
    containerOuterSize: number;
    errorHeight: number;
    finalBottomPosition: number;
    imageSize: number;
    loadingProfilePicture: Store.Status;
};

const FrameLoader = ({
    containerOuterSize,
    errorHeight,
    finalBottomPosition,
    imageSize,
    loadingProfilePicture,
}: Props) => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const { picturesUri, resetPictures, repost } =
        React.useContext(CreateFrameContext);

    const loadingFrame = useSelector(selectFramesLoadingPost);

    const bottomState = useSharedValue(loadingFrame === 'PENDING' ? 0 : 1);
    const errorState = useSharedValue(loadingFrame === 'ERROR' ? 1 : 0);
    const rotate = useSharedValue(0);
    const state = useSharedValue(loadingFrame === 'PENDING' ? 0 : 1);

    const containerStyle = useAnimatedStyle(() => {
        const bottom = interpolate(
            bottomState.value,
            [0, 1, 2],
            [-imageSize, finalBottomPosition, finalBottomPosition * 2]
        );
        const width = interpolate(
            errorState.value,
            [0, 1],
            [imageSize + containerOuterSize, errorHeight]
        );
        const backgroundColor = interpolateColor(
            errorState.value,
            [0, 1],
            ['transparent', theme.colors.danger]
        );
        return {
            backgroundColor,
            bottom,
            opacity: state.value,
            transform: [{ scale: state.value }],
            width,
        };
    }, [containerOuterSize, errorHeight, finalBottomPosition, imageSize]);
    const imageContainerStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotate.value}deg` }],
    }));

    const handlePress = React.useCallback(() => {
        if (loadingFrame !== 'ERROR') return;
        repost();
    }, [loadingFrame, repost]);

    React.useEffect(() => {
        if (loadingFrame === 'LOADING' || loadingFrame === 'ERROR') {
            if (
                loadingProfilePicture === 'LOADING' ||
                loadingProfilePicture === 'ERROR'
            )
                bottomState.value = withTiming(
                    2,
                    ANIMATIONS.TIMING_CONFIG(600)
                );
            else
                bottomState.value = withTiming(
                    1,
                    ANIMATIONS.TIMING_CONFIG(600)
                );
        } else bottomState.value = withTiming(0, ANIMATIONS.TIMING_CONFIG(600));
    }, [loadingFrame, loadingProfilePicture]);
    React.useEffect(() => {
        if (loadingFrame === 'LOADING') {
            state.value = withTiming(1, ANIMATIONS.TIMING_CONFIG(600));
            rotate.value = withRepeat(
                withTiming(360, ANIMATIONS.TIMING_CONFIG(1200)),
                -1
            );
            bottomState.value = withTiming(1, ANIMATIONS.TIMING_CONFIG(600));
        } else if (loadingFrame === 'SUCCESS') {
            state.value = withTiming(0, ANIMATIONS.TIMING_CONFIG(600), () => {
                runOnJS(resetPictures)();
            });
            rotate.value = withTiming(0, ANIMATIONS.TIMING_CONFIG(1200));
        } else if (loadingFrame === 'ERROR') {
            rotate.value = withTiming(0, ANIMATIONS.TIMING_CONFIG(1200));
        }
    }, [loadingFrame, resetPictures]);

    React.useEffect(() => {
        if (loadingFrame === 'SUCCESS') dispatch(resetFramesLoadingPost());
    }, [loadingFrame]);

    return (
        <ImageLoader
            containerOuterSize={containerOuterSize}
            containerStyle={containerStyle}
            errorText="something went wrong, press here to repost this frame"
            imageContainerStyle={imageContainerStyle}
            imageSize={imageSize}
            loading={loadingFrame}
            onPress={handlePress}
            pictureUri={picturesUri.length ? picturesUri[0] : undefined}
        />
    );
};

export default React.memo(FrameLoader);
