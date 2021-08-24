import * as React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

const FlatListWithEventThrottle = React.forwardRef((props, ref) => (
    <FlatList
        {...props}
        scrollEventThrottle={0.0001}
        // @ts-ignore
        ref={ref}
    />
));

// @ts-ignore
const AnimatedFlatList: typeof FlatList = Animated.createAnimatedComponent(
    FlatListWithEventThrottle
);

export default AnimatedFlatList;
