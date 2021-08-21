import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { Keyboard } from 'react-native';
import styled from 'styled-components/native';

import Pictogram from '#components/Pictogram';
import Typography from '#components/Typography';
import { BottomSheetContext } from '#contexts/BottomSheetContext';

import { Container, IconContainer, PictogramContainer } from './styles';

const TransparantButton = styled.Pressable`
    padding: 10px 0;
`;

const FooterTabNavigator = ({ state, navigation }: BottomTabBarProps) => {
    const [keyboardIsVisible, setKeyboardIsVisible] =
        React.useState<boolean>(false);

    React.useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => setKeyboardIsVisible(true)
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => setKeyboardIsVisible(false)
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    const currentRouteName = React.useMemo(
        () => state.routes[state.index].name,
        [state.index]
    );
    const { fadeOutBottomSheet, openBottomSheet } =
        React.useContext(BottomSheetContext);

    const handleCreateGaleriePress = React.useCallback(() => {
        if (keyboardIsVisible) Keyboard.dismiss();
        else fadeOutBottomSheet(() => navigation.navigate('CreateGalerie'));
    }, [navigation, keyboardIsVisible]);
    const handleHomePress = React.useCallback(() => {
        if (keyboardIsVisible) Keyboard.dismiss();
        else navigation.navigate('Home');
    }, [navigation, keyboardIsVisible]);
    const handleGaleriesPress = React.useCallback(() => {
        if (keyboardIsVisible) Keyboard.dismiss();
        else navigation.navigate('Galeries');
    }, [navigation, keyboardIsVisible]);
    const handleNotificationsPress = React.useCallback(() => {
        if (keyboardIsVisible) Keyboard.dismiss();
        else navigation.navigate('Notifications');
    }, [navigation, keyboardIsVisible]);
    const handleProfilePress = React.useCallback(() => {
        if (keyboardIsVisible) Keyboard.dismiss();
        else navigation.navigate('Profile');
    }, [navigation, keyboardIsVisible]);
    const handleAddSubscribePress = React.useCallback(() => {
        if (keyboardIsVisible) Keyboard.dismiss();
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
    }, [openBottomSheet, handleCreateGaleriePress, keyboardIsVisible]);

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
        <Container>
            <IconContainer onPress={handleHomePress}>
                <PictogramContainer>
                    <Pictogram color="primary" variant={homeVariant} />
                </PictogramContainer>
                <Typography color="primary" fontFamily="light" fontSize={12}>
                    home
                </Typography>
            </IconContainer>
            <IconContainer onPress={handleGaleriesPress}>
                <PictogramContainer>
                    <Pictogram color="primary" variant={galeriesVariant} />
                </PictogramContainer>
                <Typography color="primary" fontFamily="light" fontSize={12}>
                    galeries
                </Typography>
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
                <Typography color="primary" fontFamily="light" fontSize={12}>
                    notifications
                </Typography>
            </IconContainer>
            <IconContainer onPress={handleProfilePress}>
                <PictogramContainer>
                    <Pictogram color="primary" variant={profileVariant} />
                </PictogramContainer>
                <Typography color="primary" fontFamily="light" fontSize={12}>
                    profile
                </Typography>
            </IconContainer>
        </Container>
    );
};

export default FooterTabNavigator;
