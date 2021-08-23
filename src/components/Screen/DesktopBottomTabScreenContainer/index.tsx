import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

import { ANIMATIONS, GLOBAL_STYLE } from '#helpers/constants';

import { Container } from './styles';

type Props = {
    keyboardShown: boolean;
};

const DesktopBottomTabScreenContainer: React.FC<Props> = ({
    children,
    keyboardShown,
}) => {
    const dimension = useWindowDimensions();

    const paddingBottom = useSharedValue(GLOBAL_STYLE.BOTTOM_TAB_HEIGHT);

    const style = useAnimatedStyle(
        () => ({
            paddingBottom: paddingBottom.value,
        }),
        []
    );

    React.useEffect(() => {
        if (keyboardShown)
            paddingBottom.value = withTiming(0, ANIMATIONS.TIMING_CONFIG());
        else
            paddingBottom.value = withTiming(
                GLOBAL_STYLE.BOTTOM_TAB_HEIGHT,
                ANIMATIONS.TIMING_CONFIG()
            );
    }, [keyboardShown]);

    return (
        <Container height={dimension.height} style={style}>
            {children}
        </Container>
    );
};

export default DesktopBottomTabScreenContainer;
