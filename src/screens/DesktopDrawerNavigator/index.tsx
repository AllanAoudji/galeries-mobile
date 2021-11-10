import {
    createDrawerNavigator,
    DrawerNavigationOptions,
} from '@react-navigation/drawer';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { selectMe } from '#store/me';

import DrawerContent from './DrawerContent';
import MainScreen from './MainScreen';
import ModerationScreen from './ModerationScreen';
import SendTicketScreen from './SendTicketScreen';
import SettingsScreen from './SettingsScreen';

const Drawer = createDrawerNavigator<Screen.DesktopDrawer.ParamList>();

const screenOptions: DrawerNavigationOptions = {
    headerShown: false,
    swipeEnabled: false,
};

const DesktopStack = () => {
    const me = useSelector(selectMe);

    const drawerContent = React.useCallback(
        (props) => <DrawerContent role={me ? me.role : 'user'} {...props} />,
        []
    );

    const displayScreen = React.useMemo(() => {
        return !!me && me.role === 'user' ? (
            <Drawer.Screen component={SendTicketScreen} name="SendTicket" />
        ) : (
            <Drawer.Screen component={ModerationScreen} name="Moderation" />
        );
    }, [me]);

    return (
        <Drawer.Navigator
            drawerContent={drawerContent}
            initialRouteName="Main"
            screenOptions={screenOptions}
        >
            <Drawer.Screen component={MainScreen} name="Main" />
            <Drawer.Screen component={SettingsScreen} name="Settings" />
            {displayScreen}
        </Drawer.Navigator>
    );
};

export default DesktopStack;
