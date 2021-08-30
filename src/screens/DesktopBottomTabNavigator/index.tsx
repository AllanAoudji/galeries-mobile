import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import {
    DesktopBottomTabScreenContainer,
    DesktopBottomTabScreenFooter,
} from '#components/Screen';
import { useKeyboard } from '#hooks';

import CommentScreen from './CommentsScreen';
import Galerie from './GalerieScreen';
import GaleriesScreen from './GaleriesScreen';
import HomeScreen from './HomeScreen';
import NotificationsScreen from './NotificationsScreen';
import ProfileScreen from './ProfileScreen';
import LikesScreen from './LikesScreen';

const Tab = createBottomTabNavigator<Screen.DesktopBottomTab.ParamList>();

const DesktopBottomTabNavigator = () => {
    const { keyboardShown } = useKeyboard();

    const tabBar = React.useCallback(
        (props) => (
            <DesktopBottomTabScreenFooter
                keyboardShown={keyboardShown}
                {...props}
            />
        ),
        [keyboardShown]
    );

    return (
        <Tab.Navigator
            tabBar={tabBar}
            initialRouteName="Home"
            backBehavior="history"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tab.Screen name="Home">
                {() => (
                    <DesktopBottomTabScreenContainer
                        keyboardShown={keyboardShown}
                    >
                        <HomeScreen />
                    </DesktopBottomTabScreenContainer>
                )}
            </Tab.Screen>
            <Tab.Screen name="Galeries">
                {() => (
                    <DesktopBottomTabScreenContainer
                        keyboardShown={keyboardShown}
                    >
                        <GaleriesScreen />
                    </DesktopBottomTabScreenContainer>
                )}
            </Tab.Screen>
            <Tab.Screen name="Notifications">
                {() => (
                    <DesktopBottomTabScreenContainer
                        keyboardShown={keyboardShown}
                    >
                        <NotificationsScreen />
                    </DesktopBottomTabScreenContainer>
                )}
            </Tab.Screen>
            <Tab.Screen name="Profile">
                {() => (
                    <DesktopBottomTabScreenContainer
                        keyboardShown={keyboardShown}
                    >
                        <ProfileScreen />
                    </DesktopBottomTabScreenContainer>
                )}
            </Tab.Screen>
            <Tab.Screen name="Comments">
                {() => (
                    <DesktopBottomTabScreenContainer
                        keyboardShown={keyboardShown}
                    >
                        <CommentScreen />
                    </DesktopBottomTabScreenContainer>
                )}
            </Tab.Screen>
            <Tab.Screen
                name="Galerie"
                options={{
                    headerShown: false,
                }}
            >
                {() => (
                    <DesktopBottomTabScreenContainer
                        keyboardShown={keyboardShown}
                    >
                        <Galerie />
                    </DesktopBottomTabScreenContainer>
                )}
            </Tab.Screen>
            <Tab.Screen name="Likes">{() => <LikesScreen />}</Tab.Screen>
        </Tab.Navigator>
    );
};

export default DesktopBottomTabNavigator;
