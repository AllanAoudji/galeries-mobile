import * as React from 'react';
import {
    ActivityIndicator,
    NativeScrollEvent,
    NativeSyntheticEvent,
    useWindowDimensions,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import { useSelector } from 'react-redux';
import {
    selectFrameGaleriePicturesAllIds,
    selectFrameGaleriePicturesStatus,
} from '#store/galeriePictures';

import Dots from './Dots';
import Image from './Image';

import {
    ActivityIndicatorContainer,
    DotsContainer,
    LinearGradiantStyled,
} from './styles';

type Props = {
    frameId: string;
};

const Slider = ({ frameId }: Props) => {
    const dimension = useWindowDimensions();
    const theme = useTheme();

    const frameGaleriePicturesAllIdsSelector = React.useCallback(
        () => selectFrameGaleriePicturesAllIds(frameId),
        [frameId]
    );
    const galeriePictures = useSelector(frameGaleriePicturesAllIdsSelector());
    const frameGaleriePicturesStatusSelector = React.useCallback(
        () => selectFrameGaleriePicturesStatus(frameId),
        [frameId]
    );
    const status = useSelector(frameGaleriePicturesStatusSelector());

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
            (!status || status === 'PENDING' || status.includes('LOADING')),
        [status]
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
                        {galeriePictures.map((id) => (
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
                        allIds={galeriePictures}
                        currentIndex={currentIndex}
                    />
                )}
            </DotsContainer>
        </>
    );
};

export default React.memo(Slider);
