import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import {
    interpolate,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { StatusBar, StyleSheet } from 'react-native';
import { ANIMATIONS, GLOBAL_STYLE } from '#helpers/constants';

import {
    Container,
    FooterContainer,
    HeaderContainer,
    InnerContainer,
} from './styles';
import { Pictogram } from '#components';
import Buttons from './Buttons';

type Props = {
    onPress: () => void;
    onPressBack: () => void;
    profilePicture: Store.Models.ProfilePicture;
    show: boolean;
};

const Options = ({ onPress, onPressBack, profilePicture, show }: Props) => {
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
        React.useCallback(
            () => () => {
                display.value = 0;
                setOpen(false);
            },
            []
        )
    );

    if (!open) return null;

    return (
        <Container
            paddingTop={StatusBar.currentHeight}
            style={[StyleSheet.absoluteFillObject, style]}
        >
            <InnerContainer>
                <HeaderContainer onPress={onPress}>
                    <Pictogram
                        color="white"
                        height={GLOBAL_STYLE.TOP_LEFT_PICTOGRAM_HEIGHT}
                        onPress={onPressBack}
                        pl="small"
                        pr="small"
                        variant="arrow-left"
                    />
                </HeaderContainer>
                <FooterContainer>
                    <Buttons profilePicture={profilePicture} />
                </FooterContainer>
            </InnerContainer>
        </Container>
    );
};

export default Options;
