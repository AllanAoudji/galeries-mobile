import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import { FooterTabNavigator, HeaderDesktopBottomTab } from '#components';

import CommentScreen from './CommentsScreen';
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
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Galeries" component={GaleriesScreen} />
            <Tab.Screen name="Notifications" component={NotificationsScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
            <Tab.Screen
                name="Comments"
                component={CommentScreen}
                options={{
                    header: (props) => (
                        <HeaderDesktopBottomTab
                            variant="secondary"
                            {...props}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="CreateGalerie"
                component={CreateGalerie}
                options={{
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Galerie"
                component={CreateGalerie}
                options={{
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Likes"
                component={LikesScreen}
                options={{
                    header: (props) => (
                        <HeaderDesktopBottomTab
                            variant="secondary"
                            {...props}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default DesktopBottomTabNavigator;
