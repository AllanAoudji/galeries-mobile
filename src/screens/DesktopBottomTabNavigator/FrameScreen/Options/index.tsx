import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import {
    interpolate,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

import { Pictogram, Typography } from '#components';
import { ANIMATIONS, GLOBAL_STYLE } from '#helpers/constants';

import {
    Container,
    FooterContainer,
    HeaderContainer,
    LikeContainer,
    PressableContainer,
} from './styles';

type Props = {
    onPress: () => void;
    onPressBack: () => void;
    show: boolean;
};

const Options = ({ onPress, onPressBack, show }: Props) => {
    const [open, setOpen] = React.useState(show);

    const display = useSharedValue(show ? 1 : 0);

    const style = useAnimatedStyle(() => {
        const scale = interpolate(display.value, [0, 1], [1.02, 1]);
        return { opacity: display.value, transform: [{ scale }] };
    }, []);

    React.useEffect(() => {
        if (show) {
            display.value = withTiming(1, ANIMATIONS.TIMING_CONFIG(300));
            setOpen(true);
        } else
            display.value = withTiming(0, ANIMATIONS.TIMING_CONFIG(300), () =>
                runOnJS(setOpen)(false)
            );
    }, [show]);

    useFocusEffect(
        React.useCallback(() => {
            return () => {
                display.value = 0;
                setOpen(false);
            };
        }, [])
    );

    if (!open) return null;

    return (
        <Container
            paddingTop={StatusBar.currentHeight}
            style={[StyleSheet.absoluteFillObject, style]}
        >
            <PressableContainer onPress={onPress} style={{ flex: 1 }}>
                <HeaderContainer>
                    <Pictogram
                        variant="arrow-left"
                        color="white"
                        height={GLOBAL_STYLE.TOP_LEFT_PICTOGRAM_HEIGHT}
                        pl="small"
                        pr="small"
                        onPress={onPressBack}
                    />
                </HeaderContainer>
                <FooterContainer>
                    <View>
                        <Typography fontSize={18}>update frame</Typography>
                        <Typography fontSize={18}>
                            use as cover picture
                        </Typography>
                        <Typography fontSize={18}>delete frame</Typography>
                        <Typography fontSize={18}>report frame...</Typography>
                    </View>
                    <LikeContainer>
                        <Pictogram variant="heart-stroke" color="danger" />
                    </LikeContainer>
                </FooterContainer>
            </PressableContainer>
        </Container>
    );
};

export default Options;
