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
import { selectLoginStatus } from '#store/login';
import { selectSigninStatus } from '#store/signin';
import { selectForgotYourPasswordStatus } from '#store/forgotYourPassword';

const Stack = createStackNavigator<Screen.RootStack.ParamList>();

const desktopOptions: StackNavigationOptions = {
    headerShown: false,
};
const forgotYourPasswordHeader = ({ navigation }: StackHeaderProps) => {
    const loading = useSelector(selectForgotYourPasswordStatus);
    const handlePress = React.useCallback(() => {
        if (loading.includes('loading')) return;
        navigation.navigate('Landing');
    }, [loading]);

    return (
        <DefaultHeader
            color="primary-dark"
            onPress={handlePress}
            textColor="secondary-light"
            title="forgot your password?"
            variant="secondary"
        />
    );
};
const forgotYourPasswordOptions: StackNavigationOptions = {
    header: forgotYourPasswordHeader,
};
const landingOptions: StackNavigationOptions = { headerShown: false };
const loginHeader = ({ navigation }: StackHeaderProps) => {
    const loading = useSelector(selectLoginStatus);
    const handlePress = React.useCallback(() => {
        if (loading.includes('loading')) return;
        navigation.navigate('Login');
    }, [loading]);

    return (
        <DefaultHeader
            color="primary-dark"
            onPress={handlePress}
            textColor="secondary-light"
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
    const loading = useSelector(selectSigninStatus);
    const handlePress = React.useCallback(() => {
        if (loading.includes('loading')) return;
        navigation.navigate('Landing');
    }, [loading]);

    return (
        <DefaultHeader
            color="primary-dark"
            onPress={handlePress}
            textColor="secondary-light"
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
