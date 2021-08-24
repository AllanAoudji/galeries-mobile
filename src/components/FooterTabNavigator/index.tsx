import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { Keyboard } from 'react-native';
import styled from 'styled-components/native';
import {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

import Pictogram from '#components/Pictogram';
import Typography from '#components/Typography';
import { BottomSheetContext } from '#contexts/BottomSheetContext';

import { Container, IconContainer, PictogramContainer } from './styles';
import { ANIMATIONS, GLOBAL_STYLE } from '#helpers/constants';

const TransparantButton = styled.Pressable`
    padding: 10px 0;
`;

type Props = {
    keyboardShown: boolean;
};

// TODO:
// rename to DesktopBottomTabScreenFooter
// and move to components/screen
const FooterTabNavigator = ({
    state,
    navigation,
    keyboardShown,
}: BottomTabBarProps & Props) => {
    const bottom = useSharedValue(0);

    React.useEffect(() => {
        if (keyboardShown) {
            bottom.value = withTiming(
                -GLOBAL_STYLE.BOTTOM_TAB_HEIGHT,
                ANIMATIONS.TIMING_CONFIG()
            );
        } else {
            bottom.value = withTiming(0, ANIMATIONS.TIMING_CONFIG());
        }
    }, [keyboardShown]);

    const style = useAnimatedStyle(() => {
        return {
            bottom: bottom.value,
        };
    }, []);

    const currentRouteName = React.useMemo(
        () => state.routes[state.index].name,
        [state.index]
    );
    const { fadeOutBottomSheet, openBottomSheet } =
        React.useContext(BottomSheetContext);

    const handleCreateGaleriePress = React.useCallback(() => {
        if (keyboardShown) Keyboard.dismiss();
        else fadeOutBottomSheet(() => navigation.navigate('CreateGalerie'));
    }, [navigation, keyboardShown]);
    const handleHomePress = React.useCallback(() => {
        if (keyboardShown) Keyboard.dismiss();
        else navigation.navigate('Home');
    }, [navigation, keyboardShown]);
    const handleGaleriesPress = React.useCallback(() => {
        if (keyboardShown) Keyboard.dismiss();
        else navigation.navigate('Galeries');
    }, [navigation, keyboardShown]);
    const handleNotificationsPress = React.useCallback(() => {
        if (keyboardShown) Keyboard.dismiss();
        else navigation.navigate('Notifications');
    }, [navigation, keyboardShown]);
    const handleProfilePress = React.useCallback(() => {
        if (keyboardShown) Keyboard.dismiss();
        else navigation.navigate('Profile');
    }, [navigation, keyboardShown]);
    const handleAddSubscribePress = React.useCallback(() => {
        if (keyboardShown) Keyboard.dismiss();
        else
            openBottomSheet(() => (
                <>
                    <TransparantButton onPress={handleCreateGaleriePress}>
                        <Typography fontSize={18}>
                            Create a new galerie
                        </Typography>
                    </TransparantButton>
                    <TransparantButton>
                        <Typography fontSize={18}>
                            Subscribe to a galerie
                        </Typography>
                    </TransparantButton>
                </>
            ))();
    }, [openBottomSheet, handleCreateGaleriePress, keyboardShown]);

    const homeVariant = React.useMemo(
        () => (currentRouteName === 'Home' ? 'home-fill' : 'home-stroke'),
        [currentRouteName]
    );
    const galeriesVariant = React.useMemo(
        () =>
            currentRouteName === 'Galeries'
                ? 'galeries-fill'
                : 'galeries-stroke',
        [currentRouteName]
    );
    const notificationsvariant = React.useMemo(
        () =>
            currentRouteName === 'Notifications'
                ? 'heart-fill'
                : 'heart-stroke',
        [currentRouteName]
    );
    const profileVariant = React.useMemo(
        () =>
            currentRouteName === 'Profile' ? 'profile-fill' : 'profile-stroke',
        [currentRouteName]
    );

    if (
        currentRouteName === 'Comments' ||
        currentRouteName === 'CreateGalerie' ||
        currentRouteName === 'Likes'
    ) {
        return null;
    }

    return (
        <Container style={style}>
            <IconContainer onPress={handleHomePress}>
                <PictogramContainer>
                    <Pictogram color="primary" variant={homeVariant} />
                </PictogramContainer>
                {/* <Typography color="primary" fontFamily="light" fontSize={12}>
                    home
                </Typography> */}
            </IconContainer>
            <IconContainer onPress={handleGaleriesPress}>
                <PictogramContainer>
                    <Pictogram color="primary" variant={galeriesVariant} />
                </PictogramContainer>
                {/* <Typography color="primary" fontFamily="light" fontSize={12}>
                    galeries
                </Typography> */}
            </IconContainer>
            <IconContainer onPress={handleAddSubscribePress}>
                <Pictogram
                    color="primary"
                    customSize={{
                        height: 28,
                        width: 28,
                    }}
                    variant="add/subscribe-stroke"
                />
            </IconContainer>
            <IconContainer onPress={handleNotificationsPress}>
                <PictogramContainer>
                    <Pictogram color="primary" variant={notificationsvariant} />
                </PictogramContainer>
                {/* <Typography color="primary" fontFamily="light" fontSize={12}>
                    notifications
                </Typography> */}
            </IconContainer>
            <IconContainer onPress={handleProfilePress}>
                <PictogramContainer>
                    <Pictogram color="primary" variant={profileVariant} />
                </PictogramContainer>
                {/* <Typography color="primary" fontFamily="light" fontSize={12}>
                    profile
                </Typography> */}
            </IconContainer>
        </Container>
    );
};

export default FooterTabNavigator;
