import {
    CardStyleInterpolators,
    createStackNavigator,
    StackHeaderProps,
    StackNavigationOptions,
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

const desktopOptions: StackNavigationOptions = {
    headerShown: false,
};
const forgotYourPasswordHeader = () => {
    return <DefaultHeader title="forgot your password?" variant="secondary" />;
};
const forgotYourPasswordOptions: StackNavigationOptions = {
    header: forgotYourPasswordHeader,
};
const landingOptions: StackNavigationOptions = { headerShown: false };
const loginHeader = ({ navigation }: StackHeaderProps) => {
    return (
        <DefaultHeader
            onPress={() => navigation.navigate('Landing')}
            title="log-in"
            variant="secondary"
        />
    );
};
const loginOption: StackNavigationOptions = {
    header: loginHeader,
};
const screenOptions: StackNavigationOptions = {
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};
const signinHeader = ({ navigation }: StackHeaderProps) => {
    return (
        <DefaultHeader
            onPress={() => navigation.navigate('Landing')}
            title="sign-in"
            variant="secondary"
        />
    );
};
const signinOptions: StackNavigationOptions = { header: signinHeader };

const RootStackNavigator = () => {
    const me = useSelector(selectMe);

    return (
        <Stack.Navigator
            initialRouteName="Landing"
            screenOptions={screenOptions}
        >
            {me ? (
                <Stack.Screen
                    component={DesktopScreen}
                    name="Desktop"
                    options={desktopOptions}
                />
            ) : (
                <>
                    <Stack.Screen
                        component={ForgotYourPasswordScreen}
                        name="ForgotYourPassword"
                        options={forgotYourPasswordOptions}
                    />
                    <Stack.Screen
                        component={LangingScreen}
                        name="Landing"
                        options={landingOptions}
                    />
                    <Stack.Screen
                        component={LoginScreen}
                        name="Login"
                        options={loginOption}
                    />
                    <Stack.Screen
                        component={SigninScreen}
                        name="Signin"
                        options={signinOptions}
                    />
                </>
            )}
        </Stack.Navigator>
    );
};

export default RootStackNavigator;
