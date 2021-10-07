import { useFocusEffect, useNavigation } from '@react-navigation/native';
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

import {
    Button,
    BottonContainer,
    ButtonsContainer,
    Container,
    DescriptionContainer,
    FooterContainer,
    HeaderContainer,
    PressableContainer,
    Spacing,
} from './styles';

type Props = {
    description: string;
    frameId: string;
    onPress: () => void;
    onPressBack: () => void;
    show: boolean;
};

const Options = ({
    description,
    frameId,
    onPress,
    onPressBack,
    show,
}: Props) => {
    const [open, setOpen] = React.useState(show);
    const navigation = useNavigation<Screen.DesktopBottomTab.FrameProp>();

    const display = useSharedValue(show ? 1 : 0);

    const style = useAnimatedStyle(() => {
        const scale = interpolate(display.value, [0, 1], [1.02, 1]);
        return { opacity: display.value, transform: [{ scale }] };
    }, []);

    const handlePressComment = React.useCallback(
        () => navigation.navigate('Comments'),
        []
    );
    const handlePressLike = React.useCallback(
        () => navigation.navigate('Likes'),
        []
    );

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
                    <ButtonsContainer>
                        <Button>
                            <Typography fontSize={18}>update frame</Typography>
                        </Button>
                        <Button>
                            <Typography fontSize={18}>
                                use as cover picture
                            </Typography>
                        </Button>
                        <Button>
                            <Typography fontSize={18}>delete frame</Typography>
                        </Button>
                        <Button>
                            <Typography fontSize={18}>
                                report frame...
                            </Typography>
                        </Button>
                        <Spacing />
                    </ButtonsContainer>
                    {!!description && (
                        <>
                            <DescriptionContainer>
                                <Typography>{description}</Typography>
                            </DescriptionContainer>
                        </>
                    )}
                    <BottonContainer>
                        <CommentButton
                            frameId={frameId}
                            onPress={handlePressComment}
                        />
                        <LikeButton
                            frameId={frameId}
                            onPress={handlePressLike}
                        />
                    </BottonContainer>
                </FooterContainer>
            </PressableContainer>
        </Container>
    );
};

export default Options;
