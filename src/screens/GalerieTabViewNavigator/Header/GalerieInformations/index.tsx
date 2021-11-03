import * as React from 'react';
import { LayoutChangeEvent } from 'react-native';
import Animated from 'react-native-reanimated';

import Header from './Header';

type Props = {
    galerie?: Store.Models.Galerie;
    maxScroll: number;
    onLayout: (event: LayoutChangeEvent) => void;
    scrollY: Animated.SharedValue<number>;
};

const GalerieInformations = ({
    galerie,
    maxScroll,
    onLayout,
    scrollY,
}: Props) => {
    return (
        <Animated.View onLayout={onLayout}>
            <Header galerie={galerie} maxScroll={maxScroll} scrollY={scrollY} />
        </Animated.View>
    );
};

export default GalerieInformations;
