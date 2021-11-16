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
import GaleriesHeader from './GaleriesHeader';
import GaleriesScreen from './GaleriesScreen';
import HomeHeader from './HomeHeader';
import HomeScreen from './HomeScreen';
import InvitationScreen from './InvitationScreen';
import InvitationQRCode from './InvitationQRCode';
import LikesScreen from './LikesScreen';
import NotificationsHeader from './NotificationsHeader';
import NotificationsScreen from './NotificationsScreen';
import ProfileScreen from './ProfileScreen';
import ProfilePictureScreen from './ProfilePictureScreen';
import ReportCommentScreen from './ReportCommentScreen';
import ReportFrameScreen from './ReportFrameScreen';
import ReportProfilePictureScreen from './ReportProfilePictureScreen';
import SubscribeGalerieScreen from './SubscribeGalerieScreen';
import TabBar from './TabBar';
import UpdateFrameScreen from './UpdateFrameScreen';
import UpdateGalerieScreen from './UpdateGalerieScreen';
import UserGalerieBlackListScreen from './UserGalerieBlackListScreen';
import UserScreen from './UserScreen';

const Tab = createBottomTabNavigator<Screen.DesktopBottomTab.ParamList>();

const createGalerieScreenHeader = () => (
    <DefaultHeader
        color="primary-dark"
        textColor="secondary-light"
        title="create galerie"
        variant="secondary"
    />
);
const createGalerieScreenOption: BottomTabNavigationOptions = {
    header: createGalerieScreenHeader,
    headerShown: true,
};
const createInvitationScreenHeader = () => (
    <DefaultHeader
        color="primary-dark"
        textColor="secondary-light"
        title="create invitation"
        variant="secondary"
    />
);
const createInvitationScreenOption: BottomTabNavigationOptions = {
    header: createInvitationScreenHeader,
    headerShown: true,
};
const galeriesScreenHeader = () => <GaleriesHeader />;
const galeriesScreenOption: BottomTabNavigationOptions = {
    header: galeriesScreenHeader,
    headerShown: true,
};
const homeScreenHeader = () => <HomeHeader />;
const homeScreenOption: BottomTabNavigationOptions = {
    header: homeScreenHeader,
    headerShown: true,
};
const notificationsScreenHeader = () => <NotificationsHeader />;
const notificationsScreenOption: BottomTabNavigationOptions = {
    header: notificationsScreenHeader,
    headerShown: true,
};
const reportCommentScreenHeader = () => (
    <DefaultHeader
        color="primary-dark"
        textColor="secondary-light"
        title="report comment"
        variant="secondary"
    />
);
const reportCommentScreenOption: BottomTabNavigationOptions = {
    header: reportCommentScreenHeader,
    headerShown: true,
};
const reportFrameScreenHeader = () => (
    <DefaultHeader
        color="primary-dark"
        textColor="secondary-light"
        title="report frame"
        variant="secondary"
    />
);
const reportFrameScreenOption: BottomTabNavigationOptions = {
    header: reportFrameScreenHeader,
    headerShown: true,
};
const reportProfilePictureScreenHeader = () => (
    <DefaultHeader
        color="primary-dark"
        textColor="secondary-light"
        title="report profile picture"
        variant="secondary"
    />
);
const reportProfilePictureScreenOption: BottomTabNavigationOptions = {
    header: reportProfilePictureScreenHeader,
    headerShown: true,
};
const screenOptions: BottomTabNavigationOptions = {
    headerShown: false,
};
const updateFrameScreenHeader = () => (
    <DefaultHeader
        color="primary-dark"
        textColor="secondary-light"
        title="update frame"
        variant="secondary"
    />
);
const updateFrameScreenOption: BottomTabNavigationOptions = {
    header: updateFrameScreenHeader,
    headerShown: true,
};
const updateGalerieScreenHeader = () => (
    <DefaultHeader
        color="primary-dark"
        textColor="secondary-light"
        title="update galerie"
        variant="secondary"
    />
);
const updateGalerieScreenOption: BottomTabNavigationOptions = {
    header: updateGalerieScreenHeader,
    headerShown: true,
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
            <Tab.Screen
                component={GaleriesScreen}
                name="Galeries"
                options={galeriesScreenOption}
            />
            <Tab.Screen
                component={HomeScreen}
                name="Home"
                options={homeScreenOption}
            />
            <Tab.Screen component={InvitationScreen} name="Invitation" />
            <Tab.Screen component={InvitationQRCode} name="InvitationQRCode" />
            <Tab.Screen component={LikesScreen} name="Likes" />
            <Tab.Screen
                component={NotificationsScreen}
                name="Notifications"
                options={notificationsScreenOption}
            />
            <Tab.Screen component={ProfileScreen} name="Profile" />
            <Tab.Screen
                component={ProfilePictureScreen}
                name="ProfilePicture"
            />
            <Tab.Screen
                component={ReportCommentScreen}
                name="ReportComment"
                options={reportCommentScreenOption}
            />
            <Tab.Screen
                component={ReportFrameScreen}
                name="ReportFrame"
                options={reportFrameScreenOption}
            />
            <Tab.Screen
                component={ReportProfilePictureScreen}
                name="ReportProfilePicture"
                options={reportProfilePictureScreenOption}
            />
            <Tab.Screen
                component={SubscribeGalerieScreen}
                name="SubscribeGalerie"
            />
            <Tab.Screen
                component={UpdateFrameScreen}
                name="UpdateFrame"
                options={updateFrameScreenOption}
            />
            <Tab.Screen
                component={UpdateGalerieScreen}
                name="UpdateGalerie"
                options={updateGalerieScreenOption}
            />
            <Tab.Screen
                component={UserGalerieBlackListScreen}
                name="UserGalerieBlackList"
            />
            <Tab.Screen component={UserScreen} name="UserScreen" />
        </Tab.Navigator>
    );
};

export default DesktopBottomTabNavigator;
