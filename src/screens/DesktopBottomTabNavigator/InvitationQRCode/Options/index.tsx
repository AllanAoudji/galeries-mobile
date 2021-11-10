import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

import { Pictogram } from '#components';
import { ANIMATIONS, GLOBAL_STYLE } from '#helpers/constants';

import { Container, InnerContainer } from './styles';

type Props = {
    onPress: () => void;
    show: boolean;
};

const Options = ({ onPress, show }: Props) => {
    const [open, setOpen] = React.useState<boolean>(show);
    const navigation =
        useNavigation<Screen.DesktopBottomTab.GalerieNavigationProp>();

    const display = useSharedValue(show ? 1 : 0);
    const style = useAnimatedStyle(
        () => ({
            opacity: display.value,
        }),
        []
    );

    const handlePressBack = React.useCallback(() => {
        if (navigation.canGoBack()) navigation.goBack();
        else navigation.navigate('Home');
    }, [navigation]);

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
            <InnerContainer onPress={onPress}>
                <Pictogram
                    color="white"
                    height={GLOBAL_STYLE.TOP_LEFT_PICTOGRAM_HEIGHT}
                    onPress={handlePressBack}
                    pl="small"
                    pr="small"
                    variant="arrow-left"
                />
            </InnerContainer>
        </Container>
    );
};

export default Options;
