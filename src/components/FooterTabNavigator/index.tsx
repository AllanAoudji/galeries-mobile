import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import Pictogram from '#components/Pictogram';
import Typography from '#components/Typography';

import { Container, IconContainer, PictogramContainer } from './styles';

const FooterTabNavigator = ({ state, navigation }: BottomTabBarProps) => {
    const handleHomePress = React.useCallback(
        () => navigation.navigate('Home'),
        [navigation]
    );
    const handleGaleriesPress = React.useCallback(
        () => navigation.navigate('Galeries'),
        [navigation]
    );
    const handleNotificationsPress = React.useCallback(
        () => navigation.navigate('Notifications'),
        [navigation]
    );
    const handleProfilePress = React.useCallback(
        () => navigation.navigate('Profile'),
        [navigation]
    );

    const currentRouteName = React.useMemo(
        () => state.routes[state.index].name,
        [state.index]
    );

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
            <IconContainer>
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
