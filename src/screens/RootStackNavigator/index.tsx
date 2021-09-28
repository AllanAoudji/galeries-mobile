import {
    CardStyleInterpolators,
    createStackNavigator,
} from '@react-navigation/stack';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { DefaultHeader } from '#components';

import DesktopScreen from './DesktopScreen';
import ForgotYourPasswordScreen from './ForgotYourPasswordScreen';
import LangingScreen from './LandingScreen';
import LoginScreen from './LoginScreen';
import SigninScreen from './SigninScreen';
import { selectMe } from '#store/me';

const Stack = createStackNavigator<Screen.RootStack.ParamList>();

const RootStackNavigator = () => {
    const me = useSelector(selectMe);

    return (
        <Stack.Navigator
            initialRouteName="Landing"
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
        >
            {me ? (
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
                                    onPress={() =>
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
                                    onPress={() =>
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
