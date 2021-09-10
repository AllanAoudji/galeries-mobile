import * as React from 'react';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import styled from 'styled-components/native';

import { ANIMATIONS } from '#helpers/constants';

import Container from './Container';

type Props = {
    galeriePicture: Store.Models.GaleriePicture;
};

const ImageStyled = styled(Animated.Image)`
    height: 100%;
    width: 100%;
`;

const Image = ({ galeriePicture }: Props) => {
    const opacity = useSharedValue(0);

    const style = useAnimatedStyle(
        () => ({
            opacity: opacity.value,
        }),
        []
    );

    const handleLoadEnd = React.useCallback(() => {
        opacity.value = withTiming(1, ANIMATIONS.TIMING_CONFIG(200));
    }, []);

    return (
        <Container colors={galeriePicture.pendingHexes}>
            <ImageStyled
                onLoadEnd={handleLoadEnd}
                source={{ uri: galeriePicture.cropedImage.signedUrl }}
                style={style}
            />
        </Container>
    );
};

export default Image;
