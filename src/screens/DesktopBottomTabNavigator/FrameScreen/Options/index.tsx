import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import {
    interpolate,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

import { CommentButton, LikeButton, Pictogram, Typography } from '#components';
import { ANIMATIONS, GLOBAL_STYLE } from '#helpers/constants';

import Buttons from './Buttons';

import {
    BottonContainer,
    Container,
    DescriptionContainer,
    FooterContainer,
    HeaderContainer,
    InnerContainer,
} from './styles';

type Props = {
    description: string;
    frame: Store.Models.Frame;
    onPress: () => void;
    onPressBack: () => void;
    show: boolean;
};

const Options = ({ description, frame, onPress, onPressBack, show }: Props) => {
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
            <InnerContainer style={{ flex: 1 }}>
                <HeaderContainer onPress={onPress}>
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
                    <Buttons frameId={frame.id} />
                    {!!description && (
                        <>
                            <DescriptionContainer>
                                <Typography>{description}</Typography>
                            </DescriptionContainer>
                        </>
                    )}
                    <BottonContainer>
                        <CommentButton frame={frame} />
                        <LikeButton frame={frame} />
                    </BottonContainer>
                </FooterContainer>
            </InnerContainer>
        </Container>
    );
};

export default Options;
