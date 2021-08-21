import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import {
    BottomTabScreenView,
    FooterTabNavigator,
    HeaderDesktopBottomTab,
} from '#components';

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
    return (
        <Tab.Navigator
            tabBar={(props) => <FooterTabNavigator {...props} />}
            initialRouteName="Home"
            backBehavior="history"
            screenOptions={{
                header: (props) => <HeaderDesktopBottomTab {...props} />,
            }}
        >
            <Tab.Screen name="Home">
                {() => (
                    <BottomTabScreenView>
                        <HomeScreen />
                    </BottomTabScreenView>
                )}
            </Tab.Screen>
            <Tab.Screen name="Galeries">
                {(props) => (
                    <BottomTabScreenView>
                        <GaleriesScreen {...props} />
                    </BottomTabScreenView>
                )}
            </Tab.Screen>
            <Tab.Screen name="Notifications">
                {() => (
                    <BottomTabScreenView>
                        <NotificationsScreen />
                    </BottomTabScreenView>
                )}
            </Tab.Screen>
            <Tab.Screen name="Profile">
                {() => (
                    <BottomTabScreenView>
                        <ProfileScreen />
                    </BottomTabScreenView>
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
                    <BottomTabScreenView>
                        <CommentScreen />
                    </BottomTabScreenView>
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
                    <BottomTabScreenView>
                        <Galerie {...props} />
                    </BottomTabScreenView>
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
