import * as React from 'react';
import {
    ActivityIndicator,
    NativeScrollEvent,
    NativeSyntheticEvent,
    useWindowDimensions,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { useTheme } from 'styled-components';

import { selectFrameGaleriePictures } from '#store/galeriePictures';

import Image from './Image';

import {
    ActivityIndicatorContainer,
    Dot,
    DotsContainer,
    LinearGradiantStyled,
} from './styles';

type Props = {
    frameId: string;
};

const Slider = ({ frameId }: Props) => {
    const dimension = useWindowDimensions();
    const theme = useTheme();

    const selectGaleriePictures = React.useMemo(
        () => selectFrameGaleriePictures(frameId),
        [frameId]
    );
    const galeriePictures = useSelector(selectGaleriePictures);

    const [currentIndex, setCurrentIndex] = React.useState<number>(0);

    const handleScroll = React.useCallback(
        ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
            const index = Math.round(
                nativeEvent.contentOffset.x / dimension.width
            );
            if (index !== currentIndex) setCurrentIndex(index);
        },
        [currentIndex]
    );

    return (
        <>
            <LinearGradiantStyled size={dimension.width}>
                {galeriePictures ? (
                    <ScrollView
                        decelerationRate="fast"
                        disableIntervalMomentum={true}
                        horizontal
                        onScroll={handleScroll}
                        overScrollMode="never"
                        snapToInterval={dimension.width}
                    >
                        {galeriePictures.map((galeriePicture) => (
                            <Image
                                galeriePicture={galeriePicture}
                                key={galeriePicture.id}
                            />
                        ))}
                    </ScrollView>
                ) : (
                    <ActivityIndicatorContainer>
                        <ActivityIndicator
                            color={theme.colors.primary}
                            style={{ transform: [{ scale: 2 }] }}
                        />
                    </ActivityIndicatorContainer>
                )}
            </LinearGradiantStyled>
            <DotsContainer>
                {galeriePictures &&
                    galeriePictures.length > 1 &&
                    galeriePictures.map((galeriePicture, index) => (
                        <Dot
                            current={currentIndex === index}
                            key={galeriePicture.id}
                        />
                    ))}
            </DotsContainer>
        </>
    );
};

export default React.memo(Slider);
