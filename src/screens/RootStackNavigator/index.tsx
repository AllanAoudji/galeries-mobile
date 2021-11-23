import {
    CardStyleInterpolators,
    createStackNavigator,
    StackHeaderProps,
    StackNavigationOptions,
} from '@react-navigation/stack';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { DefaultHeader } from '#components';

import ConfirmYourAccountScreen from './ConfirmYourAccountScreen';
import DesktopScreen from './DesktopScreen';
import ForgotYourPasswordScreen from './ForgotYourPasswordScreen';
import ForgotYourPasswordLandingHeader from './ForgotYourPasswordLandingHeader';
import ForgotYourPasswordLandingScreen from './ForgotYourPasswordLandingScreen';
import LangingScreen from './LandingScreen';
import LoginScreen from './LoginScreen';
import SigninScreen from './SigninScreen';
import { selectMe } from '#store/me';
import { selectLoginStatus } from '#store/login';
import { selectSigninStatus } from '#store/signin';
import { selectResetPasswordStatus } from '#store/resetPassword';

const Stack = createStackNavigator<Screen.RootStack.ParamList>();

const confirmYourAccountHeader = ({ navigation }: StackHeaderProps) => {
    const handlePress = React.useCallback(() => {
        navigation.navigate('Landing');
    }, [navigation]);

    return (
        <DefaultHeader
            color="primary-dark"
            onPress={handlePress}
            textColor="secondary-light"
            title="confirm your account"
            variant="secondary"
        />
    );
};
const confirmYourAccontOptions: StackNavigationOptions = {
    header: confirmYourAccountHeader,
};
const desktopOptions: StackNavigationOptions = {
    headerShown: false,
};
const forgotYourPasswordHeader = ({ navigation }: StackHeaderProps) => {
    const loading = useSelector(selectResetPasswordStatus);
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
const forgotYourPasswordLandingOptions: StackNavigationOptions = {
    header: ForgotYourPasswordLandingHeader,
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
            initialRouteName="ConfirmYourAccount"
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
                        component={ConfirmYourAccountScreen}
                        name="ConfirmYourAccount"
                        options={confirmYourAccontOptions}
                    />
                    <Stack.Screen
                        component={ForgotYourPasswordScreen}
                        name="ForgotYourPassword"
                        options={forgotYourPasswordOptions}
                    />
                    <Stack.Screen
                        component={ForgotYourPasswordLandingScreen}
                        name="ForgotYourPasswordLanding"
                        options={forgotYourPasswordLandingOptions}
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
