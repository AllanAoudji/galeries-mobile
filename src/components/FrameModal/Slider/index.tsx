import * as React from 'react';
import {
    NativeScrollEvent,
    NativeSyntheticEvent,
    useWindowDimensions,
    View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import Image from './Image';

type DotNavigationProps = {
    current: boolean;
};
type SliderProps = {
    galeriePictures: Store.Models.GaleriePicture[];
};

const Dot = styled.View<DotNavigationProps>`
    background-color: ${({ theme, current }) =>
        current ? theme.colors.primary : theme.colors['secondary-dark']};
    border-radius: 3px;
    height: 6px;
    margin: 0 3px;
    transform: ${({ current }) => (current ? 'scale(1.1)' : 'scale(1)')};
    width: 6px;
`;
const DotsContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    padding-top: 8px;
`;

const Slider = ({ galeriePictures }: SliderProps) => {
    const dimension = useWindowDimensions();

    const [currentIndex, setCurrentIndex] = React.useState<number>(0);

    const handleMomentumScrollEnd = React.useCallback(
        ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
            const position = nativeEvent.contentOffset.x;
            const index = Math.round(position / dimension.width);
            if (index !== currentIndex) setCurrentIndex(index);
        },
        [currentIndex]
    );

    return (
        <View>
            <ScrollView
                horizontal
                disableIntervalMomentum={true}
                snapToInterval={dimension.width}
                decelerationRate="fast"
                onScroll={handleMomentumScrollEnd}
                overScrollMode="never"
            >
                {galeriePictures.map((galeriePicture) => (
                    <Image
                        galeriePicture={galeriePicture}
                        key={galeriePicture.id}
                    />
                ))}
            </ScrollView>
            {galeriePictures.length > 1 && (
                <DotsContainer>
                    {galeriePictures.map((galeriePicture, index) => (
                        <Dot
                            current={currentIndex === index}
                            key={galeriePicture.id}
                        />
                    ))}
                </DotsContainer>
            )}
        </View>
    );
};

export default Slider;
