import * as React from 'react';
import { useSelector } from 'react-redux';
import {
    interpolate,
    interpolateColor,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from 'react-native-reanimated';
import { useTheme } from 'styled-components/native';
import { useWindowDimensions } from 'react-native';
import { selectProfilePicturesLoadingPost } from '#store/profilePictures';
import { CreateProfilePictureContext } from '#contexts/CreateProfilePictureContext';

import {
    Container,
    ActivityIndicatorStyled,
    LoadingContainer,
    ImageContainer,
    PictogramContainer,
    StyledImage,
    ErrorContainer,
} from './styles';
import { ANIMATIONS } from '#helpers/constants';
import convertPixelToNum from '#helpers/convertPixelToNum';
import Typography from '#components/Typography';

const CONTAINER_OUTER_SIZE = 12;
const IMAGE_SIZE = 50;

const PostingProfilePictures = () => {
    const loading = useSelector(selectProfilePicturesLoadingPost);
    const dimension = useWindowDimensions();
    const theme = useTheme();
    const final = React.useMemo(
        () =>
            convertPixelToNum(theme.spacings.largest) -
            CONTAINER_OUTER_SIZE / 2,
        [theme]
    );
    const errorHeight = React.useMemo(
        () =>
            dimension.width -
            (convertPixelToNum(theme.spacings.normal) -
                CONTAINER_OUTER_SIZE / 2) *
                2,
        [dimension]
    );

    const { pictureUri, removePicture, repost } = React.useContext(
        CreateProfilePictureContext
    );

    const rotate = useSharedValue(0);
    const state = useSharedValue(loading === 'PENDING' ? 0 : 1);
    const error = useSharedValue(loading === 'ERROR' ? 1 : 0);
    const containerStyle = useAnimatedStyle(() => {
        const bottom = interpolate(state.value, [0, 1], [-IMAGE_SIZE, final]);
        const width = interpolate(
            error.value,
            [0, 1],
            [IMAGE_SIZE + CONTAINER_OUTER_SIZE, errorHeight]
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
    }, [errorHeight, final]);
    const imageContainerStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotate.value}deg` }],
    }));

    const source = React.useMemo(
        () => ({
            uri: pictureUri || '',
        }),
        [pictureUri]
    );

    const handlePress = React.useCallback(() => {
        if (loading !== 'ERROR') return;
        repost();
    }, [loading, repost]);

    React.useEffect(() => {
        if (loading === 'LOADING') {
            state.value = withTiming(1, ANIMATIONS.TIMING_CONFIG(600));
            rotate.value = withRepeat(
                withTiming(360, ANIMATIONS.TIMING_CONFIG(1200)),
                -1
            );
        } else if (loading === 'SUCCESS') {
            state.value = withTiming(0, ANIMATIONS.TIMING_CONFIG(600), () => {
                runOnJS(removePicture)();
            });
            rotate.value = withTiming(0, ANIMATIONS.TIMING_CONFIG(1200));
        } else if (loading === 'ERROR') {
            rotate.value = withTiming(0, ANIMATIONS.TIMING_CONFIG(1200));
        }
    }, [loading, removePicture]);
    React.useEffect(() => {
        if (loading === 'ERROR')
            error.value = withTiming(1, ANIMATIONS.TIMING_CONFIG(300));
        else error.value = withTiming(0, ANIMATIONS.TIMING_CONFIG(300));
    }, [loading]);

    return (
        <Container
            imageSize={IMAGE_SIZE}
            containerOuterSize={CONTAINER_OUTER_SIZE}
            style={containerStyle}
        >
            <LoadingContainer imageSize={IMAGE_SIZE}>
                <ImageContainer
                    imageSize={IMAGE_SIZE}
                    style={imageContainerStyle}
                >
                    {!!pictureUri && (
                        <StyledImage imageSize={IMAGE_SIZE} source={source} />
                    )}
                </ImageContainer>
                {loading !== 'ERROR' && (
                    <PictogramContainer imageSize={IMAGE_SIZE}>
                        <ActivityIndicatorStyled
                            color={theme.colors['secondary-light']}
                        />
                    </PictogramContainer>
                )}
            </LoadingContainer>
            {loading === 'ERROR' && (
                <ErrorContainer
                    imageSize={IMAGE_SIZE}
                    containerOuterSize={CONTAINER_OUTER_SIZE}
                    errorHeight={errorHeight}
                    onPress={handlePress}
                >
                    <Typography color="secondary-light" fontFamily="bold">
                        something went wrong, press here to repost this profile
                        picture
                    </Typography>
                </ErrorContainer>
            )}
        </Container>
    );
};

export default React.memo(PostingProfilePictures);
