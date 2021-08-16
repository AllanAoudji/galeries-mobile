import {
    CardStyleInterpolators,
    createStackNavigator,
} from '@react-navigation/stack';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { userDataSelector } from '#store/selectors';

import DesktopScreen from './DesktopScreen';
import ForgotYourPasswordScreen from './ForgotYourPasswordScreen';
import LangingScreen from './LandingScreen';
import LoginScreen from './LoginScreen';
import SigninScreen from './SigninScreen';

const Stack = createStackNavigator<Screen.Home.HomeStackParamList>();

const HomeStack = () => {
    const userData = useSelector(userDataSelector);

    return (
        <Stack.Navigator
            initialRouteName="Landing"
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                headerShown: false,
            }}
        >
            {userData ? (
                <Stack.Screen name="Desktop" component={DesktopScreen} />
            ) : (
                <>
                    <Stack.Screen
                        name="ForgotYourPassword"
                        component={ForgotYourPasswordScreen}
                    />
                    <Stack.Screen name="Landing" component={LangingScreen} />
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Signin" component={SigninScreen} />
                </>
            )}
        </Stack.Navigator>
    );
};

export default HomeStack;
