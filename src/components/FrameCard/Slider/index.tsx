import * as React from 'react';
import {
    ActivityIndicator,
    NativeScrollEvent,
    NativeSyntheticEvent,
    useWindowDimensions,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';

import Dots from './Dots';
import Image from './Image';

import {
    ActivityIndicatorContainer,
    DotsContainer,
    LinearGradiantStyled,
} from './styles';

type Props = {
    galeriePictures?: {
        allIds: string[];
        status: Store.Status;
    };
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

    const galeriePicturesAreLoading = React.useMemo(
        () =>
            galeriePictures &&
            (galeriePictures.status === 'PENDING' ||
                galeriePictures.status.includes('LOADING')),
        [galeriePictures]
    );

    return (
        <>
            <LinearGradiantStyled size={dimension.width}>
                {galeriePictures && !galeriePicturesAreLoading ? (
                    <ScrollView
                        decelerationRate="fast"
                        disableIntervalMomentum={true}
                        horizontal
                        onScroll={handleScroll}
                        overScrollMode="never"
                        snapToInterval={dimension.width}
                    >
                        {galeriePictures.allIds.map((id) => (
                            <Image galeriePictureId={id} key={id} />
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
                {!!galeriePictures && (
                    <Dots
                        allIds={galeriePictures.allIds}
                        currentIndex={currentIndex}
                    />
                )}
            </DotsContainer>
        </>
    );
};

export default React.memo(Slider);
