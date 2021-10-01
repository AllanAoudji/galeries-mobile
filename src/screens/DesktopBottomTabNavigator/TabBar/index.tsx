import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';
import * as React from 'react';
import { Keyboard } from 'react-native';
import {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { useTheme } from 'styled-components/native';

import { BottomSheetButton, Pictogram } from '#components';
import { BottomSheetContext } from '#contexts/BottomSheetContext';
import { ANIMATIONS, GLOBAL_STYLE } from '#helpers/constants';
import { useKeyboard } from '#hooks';

import { Container, IconContainer, PictogramContainer } from './styles';

const TabBar = ({ navigation, state }: BottomTabBarProps) => {
    const { keyboardShown } = useKeyboard();
    const theme = useTheme();

    const { closeBottomSheet, openBottomSheet } =
        React.useContext(BottomSheetContext);

    const bottom = useSharedValue(0);
    const style = useAnimatedStyle(() => {
        return {
            bottom: bottom.value,
        };
    }, []);

    const currentRouteName = React.useMemo(
        () => state.routes[state.index].name,
        [state.index]
    );
    const galeriesVariant = React.useMemo(
        () =>
            currentRouteName === 'Galeries'
                ? 'galeries-fill'
                : 'galeries-stroke',
        [currentRouteName]
    );
    const homeVariant = React.useMemo(
        () => (currentRouteName === 'Home' ? 'home-fill' : 'home-stroke'),
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
    const showTabBar = React.useMemo(
        () =>
            currentRouteName === 'Comments' ||
            currentRouteName === 'CreateFrame' ||
            currentRouteName === 'CreateGalerie' ||
            currentRouteName === 'Likes',
        [currentRouteName]
    );

    const handleCreateGaleriePress = React.useCallback(() => {
        if (keyboardShown) Keyboard.dismiss();
        else {
            closeBottomSheet();
            navigation.navigate('CreateGalerie');
        }
    }, [keyboardShown]);
    const handleGaleriesPress = React.useCallback(() => {
        if (keyboardShown) Keyboard.dismiss();
        else navigation.navigate('Galeries');
    }, [navigation, keyboardShown]);
    const handleHomePress = React.useCallback(() => {
        if (keyboardShown) Keyboard.dismiss();
        else navigation.navigate('Home');
    }, [navigation, keyboardShown]);
    const handleNotificationsPress = React.useCallback(() => {
        if (keyboardShown) Keyboard.dismiss();
        else navigation.navigate('Notifications');
    }, [navigation, keyboardShown]);
    const handleProfilePress = React.useCallback(() => {
        console.log('press');
        if (keyboardShown) Keyboard.dismiss();
        else navigation.navigate('Profile');
    }, [navigation, keyboardShown]);
    const handleAddSubscribePress = React.useCallback(() => {
        if (keyboardShown) Keyboard.dismiss();
        else
            openBottomSheet(
                <>
                    <BottomSheetButton
                        onPress={handleCreateGaleriePress}
                        title="create a new galerie"
                    />
                    <BottomSheetButton title="Subscribe to a galerie" />
                </>
            );
    }, [openBottomSheet, handleCreateGaleriePress, keyboardShown]);

    // TODO: Bug here when reload
    React.useEffect(() => {
        if (keyboardShown)
            bottom.value = withTiming(
                -GLOBAL_STYLE.BOTTOM_TAB_HEIGHT,
                ANIMATIONS.TIMING_CONFIG()
            );
        else bottom.value = withTiming(0, ANIMATIONS.TIMING_CONFIG());
    }, [keyboardShown]);

    if (showTabBar) return null;

    return (
        <Container style={style}>
            <LinearGradient
                colors={['transparent', theme.colors['secondary-light']]}
                locations={[0, 0.8]}
                style={{ width: '100%', flexDirection: 'row' }}
            >
                <IconContainer onPress={handleHomePress}>
                    <PictogramContainer>
                        <Pictogram color="primary" variant={homeVariant} />
                    </PictogramContainer>
                </IconContainer>
                <IconContainer onPress={handleGaleriesPress}>
                    <PictogramContainer>
                        <Pictogram color="primary" variant={galeriesVariant} />
                    </PictogramContainer>
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
                        <Pictogram
                            color="primary"
                            variant={notificationsvariant}
                        />
                    </PictogramContainer>
                </IconContainer>
                <IconContainer onPress={handleProfilePress}>
                    <PictogramContainer>
                        <Pictogram color="primary" variant={profileVariant} />
                    </PictogramContainer>
                </IconContainer>
            </LinearGradient>
        </Container>
    );
};

export default React.memo(TabBar);
