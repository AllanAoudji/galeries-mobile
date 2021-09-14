import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import CommentScreen from './CommentsScreen';
import GalerieScreen from './GalerieScreen';
import GaleriesScreen from './GaleriesScreen';
import HomeScreen from './HomeScreen';
import LikesScreen from './LikesScreen';
import NotificationsScreen from './NotificationsScreen';
import ProfileScreen from './ProfileScreen';
import TabBar from './TabBar';

const Tab = createBottomTabNavigator<Screen.DesktopBottomTab.ParamList>();

const DesktopBottomTabNavigator = () => {
    const tabBar = React.useCallback((props) => <TabBar {...props} />, []);

    return (
        <Tab.Navigator
            backBehavior="history"
            initialRouteName="Home"
            screenOptions={{ headerShown: false }}
            tabBar={tabBar}
        >
            <Tab.Screen component={HomeScreen} name="Home" />
            <Tab.Screen component={GaleriesScreen} name="Galeries" />
            <Tab.Screen component={NotificationsScreen} name="Notifications" />
            <Tab.Screen component={ProfileScreen} name="Profile" />
            <Tab.Screen component={CommentScreen} name="Comments" />
            <Tab.Screen
                component={GalerieScreen}
                name="Galerie"
                options={{ headerShown: false }}
            />
            <Tab.Screen component={LikesScreen} name="Likes" />
        </Tab.Navigator>
    );
};

export default DesktopBottomTabNavigator;
