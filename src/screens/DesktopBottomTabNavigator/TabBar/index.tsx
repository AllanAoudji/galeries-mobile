import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import {
    InteractionManager,
    Keyboard,
    useWindowDimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components/native';

import { Pictogram } from '#components';
import { BottomSheetContext } from '#contexts/BottomSheetContext';
import { useKeyboard } from '#hooks';
import { resetGaleriesCurrent } from '#store/galeries';
import { getMe, selectMe } from '#store/me';

import CreateGalerieButton from './CreateGalerieButton';
import SubscribeGalerieButton from './SubscribeGalerieButton';

import HasNewNotifications from './HasNewNotifications';

import {
    Container,
    IconContainer,
    LinearGradientStyle,
    PictogramContainer,
} from './styles';

const INTERVAL = 1000 * 30;
const customSize = {
    height: 28,
    width: 28,
};
const location = [0, 0.8];

const TabBar = ({ navigation, state }: BottomTabBarProps) => {
    const dispatch = useDispatch();
    const dimension = useWindowDimensions();
    const theme = useTheme();

    const { keyboardShown } = useKeyboard();

    const { openBottomSheet } = React.useContext(BottomSheetContext);

    const timer = React.useRef<ReturnType<typeof setInterval> | null>(null);

    const me = useSelector(selectMe);

    const color = React.useMemo(
        () => ['transparent', theme.colors['secondary-light']],
        [theme]
    );
    const currentRouteName = React.useMemo(
        () => state.routes[state.index].name,
        [state]
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
            currentRouteName === 'CreateInvitation' ||
            currentRouteName === 'CreateProfilePictureCamera' ||
            currentRouteName === 'DeleteGalerie' ||
            currentRouteName === 'Frame' ||
            currentRouteName === 'Invitation' ||
            currentRouteName === 'InvitationQRCode' ||
            currentRouteName === 'Likes' ||
            currentRouteName === 'ProfilePicture' ||
            currentRouteName === 'ReportComment' ||
            currentRouteName === 'ReportFrame' ||
            currentRouteName === 'ReportProfilePicture' ||
            currentRouteName === 'SubscribeGalerie' ||
            currentRouteName === 'UpdateFrame' ||
            currentRouteName === 'UserGalerieBlackList' ||
            currentRouteName === 'UserScreen',
        [currentRouteName]
    );

    const bottomSheetContent = React.useCallback(() => {
        return (
            <>
                <CreateGalerieButton navigation={navigation} />
                <SubscribeGalerieButton navigation={navigation} />
            </>
        );
    }, [navigation]);
    const handleGaleriesPress = React.useCallback(() => {
        if (keyboardShown) Keyboard.dismiss();
        else {
            navigation.navigate('Galeries');
            InteractionManager.runAfterInteractions(() => {
                dispatch(resetGaleriesCurrent());
            });
        }
    }, [keyboardShown, navigation]);
    const handleHomePress = React.useCallback(() => {
        if (keyboardShown) Keyboard.dismiss();
        else {
            navigation.navigate('Home');
            InteractionManager.runAfterInteractions(() => {
                dispatch(resetGaleriesCurrent());
            });
        }
    }, [keyboardShown, navigation]);
    const handleNotificationsPress = React.useCallback(() => {
        if (keyboardShown) Keyboard.dismiss();
        else {
            navigation.navigate('Notifications');
            InteractionManager.runAfterInteractions(() => {
                dispatch(resetGaleriesCurrent());
            });
        }
    }, [keyboardShown, navigation]);
    const handleProfilePress = React.useCallback(() => {
        if (keyboardShown) Keyboard.dismiss();
        else {
            navigation.navigate('Profile');
            InteractionManager.runAfterInteractions(() => {
                dispatch(resetGaleriesCurrent());
            });
        }
    }, [keyboardShown, navigation]);
    const handleAddSubscribePress = React.useCallback(() => {
        if (keyboardShown) Keyboard.dismiss();
        else openBottomSheet(bottomSheetContent);
    }, [bottomSheetContent, openBottomSheet, keyboardShown]);

    React.useEffect(() => {
        if ((currentRouteName === 'Notifications' || !me) && timer.current) {
            clearInterval(timer.current);
            timer.current = null;
        }
        if (currentRouteName !== 'Notifications' && me && !timer.current) {
            timer.current = setInterval(() => {
                dispatch(getMe());
            }, INTERVAL);
        }
    }, [currentRouteName, me, timer]);

    if (showTabBar) return null;

    return (
        <Container width={dimension.width}>
            <LinearGradientStyle
                colors={color}
                locations={location}
                width={dimension.width}
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
                        customSize={customSize}
                        variant="add/subscribe-stroke"
                    />
                </IconContainer>
                <IconContainer onPress={handleNotificationsPress}>
                    <PictogramContainer>
                        <HasNewNotifications />
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
            </LinearGradientStyle>
        </Container>
    );
};

export default React.memo(TabBar);
