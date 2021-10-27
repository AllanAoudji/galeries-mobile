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
import CreateInvitationScreen from './CreateInvitationScreen';
import DeleteGalerieScreen from './DeleteGalerieScreen';
import FrameScreen from './FrameScreen';
import GalerieScreen from './GalerieScreen';
import GaleriesScreen from './GaleriesScreen';
import HomeScreen from './HomeScreen';
import InvitationScreen from './InvitationScreen';
import InvitationQRCode from './InvitationQRCode';
import LikesScreen from './LikesScreen';
import NotificationsScreen from './NotificationsScreen';
import ProfileScreen from './ProfileScreen';
import SubscribeGalerieScreen from './SubscribeGalerieScreen';
import TabBar from './TabBar';
import UpdateFrameScreen from './UpdateFrameScreen';

const Tab = createBottomTabNavigator<Screen.DesktopBottomTab.ParamList>();

const createGalerieScreenHeader = () => (
    <DefaultHeader title="create galerie" variant="secondary" />
);
const createGalerieScreenOption: BottomTabNavigationOptions = {
    header: createGalerieScreenHeader,
    headerShown: true,
};
const createInvitationScreenHeader = () => (
    <DefaultHeader title="create invitation" variant="secondary" />
);
const createInvitationScreenOption: BottomTabNavigationOptions = {
    header: createInvitationScreenHeader,
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
            <Tab.Screen
                component={CreateInvitationScreen}
                name="CreateInvitation"
                options={createInvitationScreenOption}
            />
            <Tab.Screen component={DeleteGalerieScreen} name="DeleteGalerie" />
            <Tab.Screen component={FrameScreen} name="Frame" />
            <Tab.Screen component={GalerieScreen} name="Galerie" />
            <Tab.Screen component={GaleriesScreen} name="Galeries" />
            <Tab.Screen component={HomeScreen} name="Home" />
            <Tab.Screen component={InvitationScreen} name="Invitation" />
            <Tab.Screen component={InvitationQRCode} name="InvitationQRCode" />
            <Tab.Screen component={LikesScreen} name="Likes" />
            <Tab.Screen component={NotificationsScreen} name="Notifications" />
            <Tab.Screen component={ProfileScreen} name="Profile" />
            <Tab.Screen
                component={SubscribeGalerieScreen}
                name="SubscribeGalerie"
            />
            <Tab.Screen component={UpdateFrameScreen} name="UpdateFrame" />
        </Tab.Navigator>
    );
};

export default DesktopBottomTabNavigator;
