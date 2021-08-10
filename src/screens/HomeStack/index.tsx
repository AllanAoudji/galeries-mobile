import {
    CardStyleInterpolators,
    createStackNavigator,
} from '@react-navigation/stack';
import * as React from 'react';

import ForgotYouPasswordScreen from './ForgotYouPasswordScreen';
import LangingScreen from './LandingScreen';
import LoginScreen from './LoginScreen';
import SigninScreen from './SigninScreen';

const Stack = createStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Landing"
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="ForgotYourPassword"
                component={ForgotYouPasswordScreen}
            />
            <Stack.Screen name="Landing" component={LangingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signin" component={SigninScreen} />
        </Stack.Navigator>
    );
};

export default HomeStack;
