import {
    CardStyleInterpolators,
    createStackNavigator,
    StackNavigationOptions,
} from '@react-navigation/stack';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { selectMe } from '#store/me';

import ConfirmYourAccountHeader from './ConfirmYourAccountHeader';
import ConfirmYourAccountScreen from './ConfirmYourAccountScreen';
import DesktopScreen from './DesktopScreen';
import ForgotYourPasswordHeader from './ForgotYourPasswordHeader';
import ForgotYourPasswordScreen from './ForgotYourPasswordScreen';
import ForgotYourPasswordLandingHeader from './ForgotYourPasswordLandingHeader';
import ForgotYourPasswordLandingScreen from './ForgotYourPasswordLandingScreen';
import LangingScreen from './LandingScreen';
import LoginHeader from './LoginHeader';
import LoginScreen from './LoginScreen';
import SigninHeader from './SigninHeader';
import SigninScreen from './SigninScreen';

const Stack = createStackNavigator<Screen.RootStack.ParamList>();

const confirmYourAccontOptions: StackNavigationOptions = {
    header: ConfirmYourAccountHeader,
};
const desktopOptions: StackNavigationOptions = {
    headerShown: false,
};
const forgotYourPasswordOptions: StackNavigationOptions = {
    header: ForgotYourPasswordHeader,
};
const forgotYourPasswordLandingOptions: StackNavigationOptions = {
    header: ForgotYourPasswordLandingHeader,
};
const landingOptions: StackNavigationOptions = { headerShown: false };
const loginOption: StackNavigationOptions = {
    header: LoginHeader,
};
const screenOptions: StackNavigationOptions = {
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};
const signinOptions: StackNavigationOptions = { header: SigninHeader };

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
