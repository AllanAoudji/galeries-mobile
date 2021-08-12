import { StackNavigationProp } from '@react-navigation/stack';

declare global {
    type Colors = {
        black: string;
        danger: string;
        primary: string;
        'primary-dark': string;
        'primary-light': string;
        secondary: string;
        'secondary-dark': string;
        'secondary-light': string;
        success: string;
        tertiary: string;
        'tertiary-dark': string;
        'tertiary-light': string;
        white: string;
    };
    type FontFamilies = {
        bold: string;
        light: string;
        oblique: string;
        roman: string;
    };
    type FontSizes = {
        12: string;
        14: string;
        18: string;
        24: string;
        36: string;
        48: string;
        64: string;
    };
    type Spacings = {
        huge: string;
        small: string;
        smallest: string;
        normal: string;
        large: string;
        largest: string;
    };
    type TextAlign = {
        center: string;
        left: string;
        right: string;
    };
    namespace Screen {
        namespace Home {
            type HomeStackParamList = {
                ForgotYourPassword: undefined;
                Landing: undefined;
                Login: undefined;
                Signin: undefined;
            };
            type ForgotYourPasswordNavigationProp = StackNavigationProp<
                HomeStackParamList,
                'ForgotYourPassword'
            >;
            type LandingScreenNavigationProp = StackNavigationProp<
                HomeStackParamList,
                'Landing'
            >;
            type LoginScreenNavigationProp = StackNavigationProp<
                HomeStackParamList,
                'Login'
            >;
            type SigninScreenNavigationProp = StackNavigationProp<
                HomeStackParamList,
                'Signin'
            >;
        }
    }
    namespace Variant {
        type Button = 'fill' | 'stroke';
        type Logo = 'large' | 'largest' | 'normal' | 'small' | 'smallest';
    }
}
