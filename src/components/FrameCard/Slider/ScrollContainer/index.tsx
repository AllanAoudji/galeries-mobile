import * as React from 'react';
import { ScrollView, useWindowDimensions } from 'react-native';
import { CurrentGaleriePictureContext } from '#contexts/CurrentGaleriePictureContext';

import Image from './Image';

type Props = {
    allIds: string[];
    frame: Store.Models.Frame;
    onPressSlider: () => void;
};

const ScrollContainer = ({ allIds, frame, onPressSlider }: Props) => {
    const dimension = useWindowDimensions();
    const { handleScroll } = React.useContext(CurrentGaleriePictureContext);

    return (
        <ScrollView
            decelerationRate="fast"
            disableIntervalMomentum={true}
            horizontal
            onScroll={handleScroll}
            overScrollMode="never"
            snapToInterval={dimension.width}
        >
            {allIds.map((id) => (
                <Image
                    frame={frame}
                    galeriePictureId={id}
                    key={id}
                    onPress={onPressSlider}
                />
            ))}
        </ScrollView>
    );
};

export default ScrollContainer;
