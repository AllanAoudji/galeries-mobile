import * as React from 'react';
import {
    ActivityIndicator,
    NativeScrollEvent,
    NativeSyntheticEvent,
    useWindowDimensions,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';

import Image from './Image';

import {
    ActivityIndicatorContainer,
    Dot,
    DotsContainer,
    LinearGradiantStyled,
} from './styles';

type Props = {
    galeriePictures?: Store.Models.GaleriePicture[];
};

const Slider = ({ galeriePictures }: Props) => {
    const dimension = useWindowDimensions();
    const theme = useTheme();

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

export default Slider;
