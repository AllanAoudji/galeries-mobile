import * as React from 'react';
import Animated from 'react-native-reanimated';
import { Typography } from '#components';

type Props = {
    current: boolean;
    editScrollY: (offsetY: number) => void;
    scrollY: Animated.SharedValue<number>;
};

const FramesScreen = ({ current, editScrollY, scrollY }: Props) => {
    return <Typography>frame screen</Typography>;
};

export default FramesScreen;
