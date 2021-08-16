import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import GaleriesScreen from './GaleriesScreen';
import HomeScreen from './HomeScreen';
import NewGalerieScreen from './NewGalerieScreen';
import NotificationsScreen from './NotificationsScreen';
import ProfileScreen from './ProfileScreen';

const Tab = createBottomTabNavigator<Screen.Main.MainStackParamList>();

const MainStack = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Galeries" component={GaleriesScreen} />
            <Tab.Screen name="New Galerie" component={NewGalerieScreen} />
            <Tab.Screen name="Notifications" component={NotificationsScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

export default MainStack;
