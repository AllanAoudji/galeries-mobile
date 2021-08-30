import * as React from 'react';
import { BackHandler } from 'react-native';
import Animated, {
    interpolate,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import styled from 'styled-components/native';

import { ANIMATIONS } from '#helpers/constants';

type Props = {
    open: boolean;
    handleClose: () => void;
};

const Container = styled(Animated.View)`
    left: 0;
    position: absolute;
    background-color: red;
    right: 0;
    top: 0;
    z-index: 1000;
    border-width: 5px;
    border-color: green;
    width: 100%;
    height: 900px;
    z-index: 2;
    flex: 1;
`;

const FullScreenModal: React.FC<Props> = ({ open, handleClose, children }) => {
    const [display, setDisplay] = React.useState<boolean>(false);

    const opacity = useSharedValue(0);
    const style = useAnimatedStyle(() => {
        const scale = interpolate(opacity.value, [0, 1], [1.1, 1]);
        return {
            opacity: opacity.value,
            transform: [{ scale }],
        };
    });

    React.useEffect(() => {
        if (display) opacity.value = withTiming(1, ANIMATIONS.TIMING_CONFIG());
    }, [display]);
    React.useEffect(() => {
        let BackHandlerListerner: any;
        if (open) {
            setDisplay(true);
            BackHandlerListerner = BackHandler.addEventListener(
                'hardwareBackPress',
                () => {
                    if (open) {
                        handleClose();
                        return true;
                    }
                    return false;
                }
            );
        } else {
            opacity.value = withTiming(
                0,
                ANIMATIONS.TIMING_CONFIG(),
                (isFinished) => {
                    if (isFinished) runOnJS(setDisplay)(false);
                }
            );
            if (BackHandlerListerner) {
                BackHandlerListerner.remove();
            }
        }
        return () => {
            if (BackHandlerListerner) {
                BackHandlerListerner.remove();
            }
        };
    }, [open]);

    if (!display) return null;

    return <Container style={[{ elevation: 2 }, style]}>{children}</Container>;
};

export default FullScreenModal;
