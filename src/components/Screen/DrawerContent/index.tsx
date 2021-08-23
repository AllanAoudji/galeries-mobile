import { DrawerContentComponentProps } from '@react-navigation/drawer';
import * as React from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

import CustomButton from '#components/CustomButton';
import Logo from '#components/Logo';
import Typography from '#components/Typography';
import { fetchLogout } from '#store/actions';

import NavigationButton from './NavigationButton';
import { Container, LogoContainer } from './styles';

interface Props {
    role: 'admin' | 'moderator' | 'user';
}

const DrawerContent = ({
    role,
    navigation,
}: DrawerContentComponentProps & Props) => {
    const dispatch = useDispatch();

    const userOrAdmin = React.useMemo(() => {
        return role === 'user' ? (
            <NavigationButton
                customSize={{
                    height: 33,
                    width: 30,
                }}
                onPress={handlePressSendTicket}
                pictogram="ticket-stroke"
                title="Send a ticket"
            />
        ) : (
            <NavigationButton
                customSize={{
                    height: 37,
                    width: 30,
                }}
                onPress={handlePressModeration}
                pictogram="moderation-stroke"
                title="Moderation"
            />
        );
    }, [role]);

    const handlePressMain = React.useCallback(
        () => navigation.navigate('Main'),
        [navigation]
    );
    const handlePressLogout = React.useCallback(
        () => dispatch(fetchLogout()),
        [navigation]
    );
    const handlePressModeration = React.useCallback(
        () => navigation.navigate('Moderation'),
        [navigation]
    );
    const handlePressSendTicket = React.useCallback(
        () => navigation.navigate('SendTicket'),
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
                    customSize={{
                        height: 30,
                        width: 30,
                    }}
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
