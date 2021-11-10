import * as React from 'react';
import { useSelector } from 'react-redux';
import {
    ImageSourcePropType,
    StyleSheet,
    useWindowDimensions,
} from 'react-native';
import Animated, {
    interpolate,
    useAnimatedStyle,
} from 'react-native-reanimated';

import { selectGaleriePicture } from '#store/galeriePictures';

type Props = {
    current: Animated.SharedValue<number>;
    index: number;
    item: string;
};

const RenderItem = ({ current, index, item }: Props) => {
    const dimension = useWindowDimensions();
    const galeriePictureSelector = React.useMemo(
        () => selectGaleriePicture(item),
        [item]
    );
    const galeriePicture = useSelector(galeriePictureSelector);

    const inputRange = React.useMemo(
        () => [
            (index - 1) * dimension.width,
            index * dimension.width,
            (index + 1) * dimension.width,
        ],
        [dimension, index]
    );

    const style = useAnimatedStyle(() => {
        const opacity = interpolate(current.value, inputRange, [0, 0.7, 0]);
        return { opacity };
    }, [inputRange]);

    const source: ImageSourcePropType = React.useMemo(
        () => ({
            uri: galeriePicture
                ? galeriePicture.originalImage.cachedSignedUrl
                : '',
        }),
        [galeriePicture]
    );

    return (
        <Animated.Image
            blurRadius={40}
            source={source}
            style={[StyleSheet.absoluteFillObject, style]}
        />
    );
};

export default React.memo(RenderItem);
