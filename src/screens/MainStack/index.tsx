import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { useTheme } from 'styled-components/native';

import { View } from 'react-native';
import { FooterTabNavigator, Typography, Pictogram } from '#components';

import GaleriesScreen from './GaleriesScreen';
import HomeScreen from './HomeScreen';
import NewGalerieScreen from './NewGalerieScreen';
import NotificationsScreen from './NotificationsScreen';
import ProfileScreen from './ProfileScreen';

const Tab = createBottomTabNavigator<Screen.Main.MainStackParamList>();

// TODO:
// create custom tab bar
// https://github.com/react-navigation/react-navigation/issues/5126
// To open drawer see HomeScreen
// CommentScreen/LikesScreen

const MainStack = () => {
    const theme = useTheme();
    return (
        <Tab.Navigator
            tabBar={(props) => <FooterTabNavigator {...props} />}
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: false,
                tabBarIcon: ({ focused }) => {
                    let iconName: Style.Pictograms;
                    switch (route.name) {
                        case 'Galeries':
                            iconName = focused
                                ? 'galeries-fill'
                                : 'galeries-stroke';
                            break;
                        case 'Home':
                            iconName = focused ? 'home-fill' : 'home-stroke';
                            break;
                        case 'New Galerie':
                            iconName = focused
                                ? 'add/subscribe-fill'
                                : 'add/subscribe-stroke';
                            break;
                        case 'Notifications':
                            iconName = focused ? 'heart-fill' : 'heart-stroke';
                            break;
                        case 'Profile':
                            iconName = focused
                                ? 'profile-fill'
                                : 'profile-stroke';
                            break;
                        default:
                            iconName = 'home-fill';
                    }
                    const customSize =
                        route.name === 'New Galerie'
                            ? {
                                  height: 28,
                                  width: 28,
                              }
                            : undefined;
                    return (
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                top: 0,
                                width: '100%',
                                height: 41,
                            }}
                        >
                            <Pictogram
                                color="primary"
                                customSize={customSize}
                                variant={iconName}
                            />
                            {route.name !== 'New Galerie' && (
                                <Typography
                                    color="primary"
                                    fontFamily="light"
                                    fontSize={12}
                                >
                                    {route.name.toLocaleLowerCase()}
                                </Typography>
                            )}
                        </View>
                    );
                },
                tabBarStyle: {
                    backgroundColor: theme.colors['secondary-light'],
                    borderTopWidth: 2,
                    height: 70,
                    borderTopColor: theme.colors.primary,
                },
            })}
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
