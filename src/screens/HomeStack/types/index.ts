import { StackNavigationProp } from '@react-navigation/stack';

export type HomeStackParamList = {
    ForgotYourPassword: undefined;
    Landing: undefined;
    Login: undefined;
    Signin: undefined;
};

export type ForgotYourPasswordNavigationProp = StackNavigationProp<
    HomeStackParamList,
    'ForgotYourPassword'
>;
export type LandingScreenNavigationProp = StackNavigationProp<
    HomeStackParamList,
    'Landing'
>;
export type LoginScreenNavigationProp = StackNavigationProp<
    HomeStackParamList,
    'Login'
>;
export type SigninScreenNavigationProp = StackNavigationProp<
    HomeStackParamList,
    'Signin'
>;
