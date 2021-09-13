import {
    CardStyleInterpolators,
    createStackNavigator,
} from '@react-navigation/stack';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { meDataSelector } from '#store/selectors';
import { DefaultHeader } from '#components';

import DesktopScreen from './DesktopScreen';
import ForgotYourPasswordScreen from './ForgotYourPasswordScreen';
import LangingScreen from './LandingScreen';
import LoginScreen from './LoginScreen';
import SigninScreen from './SigninScreen';

const Stack = createStackNavigator<Screen.RootStack.ParamList>();

const RootStackNavigator = () => {
    const userData = useSelector(meDataSelector);

    return (
        <Stack.Navigator
            initialRouteName="Landing"
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
        >
            {userData ? (
                <Stack.Screen
                    component={DesktopScreen}
                    name="Desktop"
                    options={{ headerShown: false }}
                />
            ) : (
                <>
                    <Stack.Screen
                        component={ForgotYourPasswordScreen}
                        name="ForgotYourPassword"
                        options={{
                            header: () => (
                                <DefaultHeader
                                    title="forgot your password?"
                                    variant="secondary"
                                />
                            ),
                        }}
                    />
                    <Stack.Screen
                        component={LangingScreen}
                        name="Landing"
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        component={LoginScreen}
                        name="Login"
                        options={{
                            header: ({ navigation }) => (
                                <DefaultHeader
                                    onPressBack={() =>
                                        navigation.navigate('Landing')
                                    }
                                    title="log-in"
                                    variant="secondary"
                                />
                            ),
                        }}
                    />
                    <Stack.Screen
                        component={SigninScreen}
                        name="Signin"
                        options={{
                            header: ({ navigation }) => (
                                <DefaultHeader
                                    onPressBack={() =>
                                        navigation.navigate('Landing')
                                    }
                                    title="sign-in"
                                    variant="secondary"
                                />
                            ),
                        }}
                    />
                </>
            )}
        </Stack.Navigator>
    );
};

export default RootStackNavigator;
