import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import { FooterTabNavigator, HeaderDesktopBottomTab } from '#components';
import { DesktopBottomTabScreenContainer } from '#components/Screen';
import { useKeyboard } from '#hooks';

import CommentScreen from './CommentsScreen';
import Galerie from './GalerieScreen';
import CreateGalerie from './CreateGalerieScreen';
import GaleriesScreen from './GaleriesScreen';
import HomeScreen from './HomeScreen';
import NotificationsScreen from './NotificationsScreen';
import ProfileScreen from './ProfileScreen';
import LikesScreen from './LikesScreen';

const Tab = createBottomTabNavigator<Screen.DesktopBottomTab.ParamList>();

const DesktopBottomTabNavigator = () => {
    const { keyboardShown } = useKeyboard();

    const tabBat = React.useCallback(
        (props) => (
            <FooterTabNavigator keyboardShown={keyboardShown} {...props} />
        ),
        [keyboardShown]
    );

    return (
        <Tab.Navigator
            tabBar={tabBat}
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
            <Tab.Screen
                name="Comments"
                options={{
                    header: (props) => (
                        <HeaderDesktopBottomTab
                            variant="secondary"
                            {...props}
                        />
                    ),
                }}
            >
                {() => (
                    <DesktopBottomTabScreenContainer
                        keyboardShown={keyboardShown}
                    >
                        <CommentScreen />
                    </DesktopBottomTabScreenContainer>
                )}
            </Tab.Screen>
            <Tab.Screen
                name="CreateGalerie"
                options={{
                    headerShown: false,
                }}
            >
                {(props) => <CreateGalerie {...props} />}
            </Tab.Screen>
            <Tab.Screen
                name="Galerie"
                options={{
                    headerShown: false,
                }}
            >
                {(props) => (
                    <DesktopBottomTabScreenContainer
                        keyboardShown={keyboardShown}
                    >
                        <Galerie {...props} />
                    </DesktopBottomTabScreenContainer>
                )}
            </Tab.Screen>
            <Tab.Screen
                name="Likes"
                options={{
                    header: (props) => (
                        <HeaderDesktopBottomTab
                            variant="secondary"
                            {...props}
                        />
                    ),
                }}
            >
                {() => <LikesScreen />}
            </Tab.Screen>
        </Tab.Navigator>
    );
};

export default DesktopBottomTabNavigator;
