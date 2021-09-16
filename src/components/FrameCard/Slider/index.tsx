import * as React from 'react';
import {
    NativeScrollEvent,
    NativeSyntheticEvent,
    useWindowDimensions,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Image from './Image';

import { Dot, DotsContainer } from './styles';

type Props = {
    galeriePictures: Store.Models.GaleriePicture[];
};

const Slider = ({ galeriePictures }: Props) => {
    const dimension = useWindowDimensions();

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
        // TODO: No need ScrollView if galeriePictures.length === 1
        <>
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
            <DotsContainer>
                {galeriePictures.length > 1 &&
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
