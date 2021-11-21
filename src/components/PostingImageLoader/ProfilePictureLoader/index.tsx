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
import { useDispatch } from 'react-redux';
import { useTheme } from 'styled-components/native';

import { InteractionManager } from 'react-native';
import ImageLoader from '#components/ImageLoader';
import { CreateProfilePictureContext } from '#contexts/CreateProfilePictureContext';
import { ANIMATIONS } from '#helpers/constants';
import { resetProfilePicturesLoadingPost } from '#store/profilePictures';

type Props = {
    containerOuterSize: number;
    errorHeight: number;
    finalBottomPosition: number;
    imageSize: number;
    loadingProfilePicture: Store.Status;
};

const ProfilePictureLoader = ({
    containerOuterSize,
    errorHeight,
    finalBottomPosition,
    imageSize,
    loadingProfilePicture,
}: Props) => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const { pictureUri, removePicture, repost } = React.useContext(
        CreateProfilePictureContext
    );

    const rotate = useSharedValue(0);
    const state = useSharedValue(loadingProfilePicture === 'PENDING' ? 0 : 1);
    const error = useSharedValue(loadingProfilePicture === 'ERROR' ? 1 : 0);

    const containerStyle = useAnimatedStyle(() => {
        const bottom = interpolate(
            state.value,
            [0, 1],
            [-imageSize, finalBottomPosition]
        );
        const width = interpolate(
            error.value,
            [0, 1],
            [containerOuterSize + imageSize, errorHeight]
        );
        const backgroundColor = interpolateColor(
            error.value,
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
    }, [
        containerOuterSize,
        errorHeight,
        finalBottomPosition,
        imageSize,
        theme,
    ]);
    const imageContainerStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotate.value}deg` }],
    }));

    const handlePress = React.useCallback(() => {
        if (loadingProfilePicture !== 'ERROR') return;
        repost();
    }, [loadingProfilePicture, repost]);

    React.useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            if (loadingProfilePicture === 'LOADING') {
                state.value = withTiming(1, ANIMATIONS.TIMING_CONFIG(600));
                rotate.value = withRepeat(
                    withTiming(360, ANIMATIONS.TIMING_CONFIG(1200)),
                    -1
                );
            } else if (loadingProfilePicture === 'SUCCESS') {
                state.value = withTiming(
                    0,
                    ANIMATIONS.TIMING_CONFIG(600),
                    () => {
                        runOnJS(removePicture)();
                    }
                );
                rotate.value = withTiming(0, ANIMATIONS.TIMING_CONFIG(1200));
            } else if (loadingProfilePicture === 'ERROR') {
                rotate.value = withTiming(0, ANIMATIONS.TIMING_CONFIG(1200));
            }
        });
    }, [loadingProfilePicture, removePicture]);
    React.useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            if (loadingProfilePicture === 'ERROR')
                error.value = withTiming(1, ANIMATIONS.TIMING_CONFIG(300));
            else error.value = withTiming(0, ANIMATIONS.TIMING_CONFIG(300));
        });
    }, [loadingProfilePicture]);

    React.useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            if (loadingProfilePicture === 'SUCCESS')
                dispatch(resetProfilePicturesLoadingPost());
        });
    }, [loadingProfilePicture]);

    return (
        <ImageLoader
            containerOuterSize={containerOuterSize}
            containerStyle={containerStyle}
            errorText="something went wrong, press here to repost this frame"
            imageContainerStyle={imageContainerStyle}
            imageSize={imageSize}
            loading={loadingProfilePicture}
            onPress={handlePress}
            pictureUri={pictureUri}
        />
    );
};

export default React.memo(ProfilePictureLoader);
