import {
    BottomTabBarProps,
    BottomTabNavigationOptions,
    createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import * as React from 'react';

import { DefaultHeader } from '#components';

import CommentScreen from './CommentsScreen';
import CreateFrameScreen from './CreateFrameScreen';
import CreateGalerieScreen from './CreateGalerieScreen';
import GalerieScreen from './GalerieScreen';
import GaleriesScreen from './GaleriesScreen';
import HomeScreen from './HomeScreen';
import LikesScreen from './LikesScreen';
import NotificationsScreen from './NotificationsScreen';
import ProfileScreen from './ProfileScreen';
import TabBar from './TabBar';

const Tab = createBottomTabNavigator<Screen.DesktopBottomTab.ParamList>();

const createGalerieScreenHeader = () => (
    <DefaultHeader title="createGalerie" variant="secondary" />
);
const createGalerieScreenOption: BottomTabNavigationOptions = {
    header: createGalerieScreenHeader,
    headerShown: true,
};
const screenOptions: BottomTabNavigationOptions = {
    headerShown: false,
};
const tabBar = (props: BottomTabBarProps) => <TabBar {...props} />;

const DesktopBottomTabNavigator = () => {
    return (
        <Tab.Navigator
            backBehavior="history"
            initialRouteName="Home"
            screenOptions={screenOptions}
            tabBar={tabBar}
        >
            <Tab.Screen component={CommentScreen} name="Comments" />
            <Tab.Screen component={CreateFrameScreen} name="CreateFrame" />
            <Tab.Screen
                component={CreateGalerieScreen}
                name="CreateGalerie"
                options={createGalerieScreenOption}
            />
            <Tab.Screen component={GalerieScreen} name="Galerie" />
            <Tab.Screen component={GaleriesScreen} name="Galeries" />
            <Tab.Screen component={HomeScreen} name="Home" />
            <Tab.Screen component={LikesScreen} name="Likes" />
            <Tab.Screen component={NotificationsScreen} name="Notifications" />
            <Tab.Screen component={ProfileScreen} name="Profile" />
        </Tab.Navigator>
    );
};

export default DesktopBottomTabNavigator;
