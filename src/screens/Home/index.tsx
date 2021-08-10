import {
    CardStyleInterpolators,
    createStackNavigator,
} from '@react-navigation/stack';
import * as React from 'react';

import ForgotYouPassword from './ForgotYouPassword';
import LangingScreen from './Landing';
import LoginScreen from './Login';
import SigninScreen from './Signin';

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
                component={ForgotYouPassword}
            />
            <Stack.Screen name="Landing" component={LangingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signin" component={SigninScreen} />
        </Stack.Navigator>
    );
};

export default HomeStack;
