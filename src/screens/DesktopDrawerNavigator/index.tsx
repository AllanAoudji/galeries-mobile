import { createDrawerNavigator } from '@react-navigation/drawer';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { DrawerContent } from '#components';
import { userSelector } from '#store/selectors';

import MainScreen from './MainScreen';
import ModerationScreen from './ModerationScreen';
import SendTicketScreen from './SendTicketScreen';
import SettingsScreen from './SettingsScreen';

const Drawer = createDrawerNavigator<Screen.DesktopDrawer.ParamList>();

const DesktopStack = () => {
    const user = useSelector(userSelector);

    const displayScreen =
        !!user.data && user.data.role === 'user' ? (
            <Drawer.Screen name="SendTicket" component={SendTicketScreen} />
        ) : (
            <Drawer.Screen name="Moderation" component={ModerationScreen} />
        );

    return (
        <Drawer.Navigator
            drawerContent={(props) => (
                <DrawerContent
                    role={user.data ? user.data.role : 'user'}
                    {...props}
                />
            )}
            initialRouteName="Main"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Drawer.Screen name="Main" component={MainScreen} />
            <Drawer.Screen name="Settings" component={SettingsScreen} />
            {displayScreen}
        </Drawer.Navigator>
    );
};

export default DesktopStack;
