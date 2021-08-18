import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import styled from 'styled-components/native';

import Pictogram from '#components/Pictogram';
import Typography from '#components/Typography';
import { FooterModalsContext } from '#contexts/FooterModalsContext';

import { Container, IconContainer, PictogramContainer } from './styles';

const TransparantButton = styled.Pressable`
    padding: 10px 0;
`;

const FooterTabNavigator = ({ state, navigation }: BottomTabBarProps) => {
    const currentRouteName = React.useMemo(
        () => state.routes[state.index].name,
        [state.index]
    );
    const { resetModal, openModal } = React.useContext(FooterModalsContext);

    const handleCreateGaleriePress = React.useCallback(() => {
        resetModal(() => navigation.navigate('CreateGalerie'));
    }, [navigation]);
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

    const modalContent = React.useMemo(
        () => (
            <>
                <TransparantButton onPress={handleCreateGaleriePress}>
                    <Typography fontSize={18}>Create a new galerie</Typography>
                </TransparantButton>
                <TransparantButton>
                    <Typography fontSize={18}>
                        Subscribe to a galerie
                    </Typography>
                </TransparantButton>
            </>
        ),
        [handleCreateGaleriePress]
    );

    if (
        currentRouteName === 'Comments' ||
        currentRouteName === 'CreateGalerie' ||
        currentRouteName === 'Likes'
    ) {
        return null;
    }

    return (
        <>
            <Container>
                <IconContainer onPress={handleHomePress}>
                    <PictogramContainer>
                        <Pictogram color="primary" variant={homeVariant} />
                    </PictogramContainer>
                    <Typography
                        color="primary"
                        fontFamily="light"
                        fontSize={12}
                    >
                        home
                    </Typography>
                </IconContainer>
                <IconContainer onPress={handleGaleriesPress}>
                    <PictogramContainer>
                        <Pictogram color="primary" variant={galeriesVariant} />
                    </PictogramContainer>
                    <Typography
                        color="primary"
                        fontFamily="light"
                        fontSize={12}
                    >
                        galeries
                    </Typography>
                </IconContainer>
                <IconContainer onPress={() => openModal(modalContent)()}>
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
                    <Typography
                        color="primary"
                        fontFamily="light"
                        fontSize={12}
                    >
                        notifications
                    </Typography>
                </IconContainer>
                <IconContainer onPress={handleProfilePress}>
                    <PictogramContainer>
                        <Pictogram color="primary" variant={profileVariant} />
                    </PictogramContainer>
                    <Typography
                        color="primary"
                        fontFamily="light"
                        fontSize={12}
                    >
                        profile
                    </Typography>
                </IconContainer>
            </Container>
        </>
    );
};

export default FooterTabNavigator;
