import { DrawerContentComponentProps } from '@react-navigation/drawer';
import * as React from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

import { CustomButton, Logo, Typography } from '#components';
import { logout } from '#store/logout';

import NavigationButton from './NavigationButton';

import { Container, LogoContainer } from './styles';

type Props = {
    role: Store.Role;
};

const ModerationCustomSize = {
    height: 37,
    width: 30,
};
const sendATicketCustomSize = {
    height: 33,
    width: 30,
};
const settingsCustomSize = {
    height: 30,
    width: 30,
};
const DrawerContent = ({
    role,
    navigation,
}: DrawerContentComponentProps & Props) => {
    const dispatch = useDispatch();

    const handlePressModeration = React.useCallback(() => {
        navigation.navigate('Moderation');
    }, [navigation]);
    const handlePressSendTicket = React.useCallback(
        () => navigation.navigate('SendTicket'),
        [navigation]
    );

    const userOrAdmin = React.useMemo(() => {
        return role === 'user' ? (
            <NavigationButton
                customSize={sendATicketCustomSize}
                onPress={handlePressSendTicket}
                pictogram="ticket-stroke"
                title="Send a ticket"
            />
        ) : (
            <NavigationButton
                customSize={ModerationCustomSize}
                onPress={handlePressModeration}
                pictogram="moderation-stroke"
                title="Moderation"
            />
        );
    }, [handlePressModeration, handlePressSendTicket, role]);

    const handlePressLogout = React.useCallback(() => dispatch(logout()), []);
    const handlePressMain = React.useCallback(
        () => navigation.navigate('Main'),
        [navigation]
    );

    const handlePressSettings = React.useCallback(
        () => navigation.navigate('Settings'),
        [navigation]
    );

    return (
        <Container>
            <View>
                <LogoContainer onPress={handlePressMain}>
                    <Logo size="smallest" variant="logotype-text-vertical" />
                </LogoContainer>
                {userOrAdmin}
                <NavigationButton
                    customSize={settingsCustomSize}
                    onPress={handlePressSettings}
                    pictogram="settings-stroke"
                    title="Settings"
                />
            </View>
            <View>
                <CustomButton
                    mb="small"
                    onPress={handlePressLogout}
                    pictogram="logout-left"
                    small
                    title="logout"
                />
                <Typography fontFamily="light" fontSize={12} textAlign="center">
                    Allan Aoudji @2021
                </Typography>
            </View>
        </Container>
    );
};

export default DrawerContent;
