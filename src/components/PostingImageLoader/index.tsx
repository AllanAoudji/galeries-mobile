import * as React from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from 'styled-components/native';
import { useWindowDimensions } from 'react-native';

import { selectProfilePicturesLoadingPost } from '#store/profilePictures';
import convertPixelToNum from '#helpers/convertPixelToNum';

import FrameLoader from './FrameLoader';
import ProfilePictureLoader from './ProfilePictureLoader';

const CONTAINER_OUTER_SIZE = 12;
const IMAGE_SIZE = 50;

const PostingImageLoader = () => {
    const dimension = useWindowDimensions();
    const theme = useTheme();

    const loadingProfilePicture = useSelector(selectProfilePicturesLoadingPost);

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
        [dimension, theme]
    );

    return (
        <>
            <FrameLoader
                errorHeight={errorHeight}
                containerOuterSize={CONTAINER_OUTER_SIZE}
                finalBottomPosition={final}
                imageSize={IMAGE_SIZE}
                loadingProfilePicture={loadingProfilePicture}
            />
            <ProfilePictureLoader
                errorHeight={errorHeight}
                containerOuterSize={CONTAINER_OUTER_SIZE}
                finalBottomPosition={final}
                imageSize={IMAGE_SIZE}
                loadingProfilePicture={loadingProfilePicture}
            />
        </>
    );
};

export default React.memo(PostingImageLoader);
