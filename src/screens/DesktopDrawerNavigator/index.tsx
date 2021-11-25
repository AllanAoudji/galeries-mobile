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
        [me]
    );

    return (
        <Drawer.Navigator
            drawerContent={drawerContent}
            initialRouteName="Main"
            screenOptions={screenOptions}
        >
            <Drawer.Screen component={MainScreen} name="Main" />
            <Drawer.Screen component={SettingsScreen} name="Settings" />
            {!!me && me.role !== 'user' && (
                <Drawer.Screen component={ModerationScreen} name="Moderation" />
            )}
        </Drawer.Navigator>
    );
};

export default DesktopStack;
