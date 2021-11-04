import * as React from 'react';
import Animated from 'react-native-reanimated';

import Header from './Header';

type Props = {
    galerie?: Store.Models.Galerie;
    scrollY: Animated.SharedValue<number>;
};

const GalerieInformations = ({ galerie, scrollY }: Props) => {
    return (
        <Animated.View>
            <Header galerie={galerie} scrollY={scrollY} />
        </Animated.View>
    );
};

export default GalerieInformations;
