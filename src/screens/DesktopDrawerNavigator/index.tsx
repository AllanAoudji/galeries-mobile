import { createDrawerNavigator } from '@react-navigation/drawer';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { DrawerContent } from '#components/Screen';
import { userSelector } from '#store/selectors';

import MainScreen from './MainScreen';
import ModerationScreen from './ModerationScreen';
import SendTicketScreen from './SendTicketScreen';
import SettingsScreen from './SettingsScreen';

const Drawer = createDrawerNavigator<Screen.DesktopDrawer.ParamList>();

const DesktopStack = () => {
    const user = useSelector(userSelector);

    const drawerContent = React.useCallback(
        (props) => (
            <DrawerContent
                role={user.data ? user.data.role : 'user'}
                {...props}
            />
        ),
        []
    );

    const displayScreen = React.useMemo(() => {
        return !!user.data && user.data.role === 'user' ? (
            <Drawer.Screen name="SendTicket" component={SendTicketScreen} />
        ) : (
            <Drawer.Screen name="Moderation" component={ModerationScreen} />
        );
    }, [user.data]);

    return (
        <Drawer.Navigator
            drawerContent={drawerContent}
            initialRouteName="Main"
            screenOptions={{
                swipeEnabled: false,
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
