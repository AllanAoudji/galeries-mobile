import { DrawerNavigationProp } from '@react-navigation/drawer';
import { StackNavigationProp } from '@react-navigation/stack';
import { Method } from 'axios';

declare global {
    namespace Screen {
        namespace Desktop {
            type DesktopDrawerParamsList = {
                Main: undefined;
                Moderation: undefined;
                SendTicket: undefined;
                Settings: undefined;
            };
            type MainScreenNavigationProp = DrawerNavigationProp<
                DesktopDrawerParamsList,
                'Main'
            >;
            type ModerationScreenNavigationProp = DrawerNavigationProp<
                DesktopDrawerParamsList,
                'Moderation'
            >;
            type SendTicketScreenNavigationProp = DrawerNavigationProp<
                DesktopDrawerParamsList,
                'SendTicket'
            >;
            type SettingsScreenNavigationProp = DrawerNavigationProp<
                DesktopDrawerParamsList,
                'Settings'
            >;
        }
        namespace Home {
            type HomeStackParamList = {
                Desktop: undefined;
                ForgotYourPassword: undefined;
                Landing: undefined;
                Login: undefined;
                Signin: undefined;
            };
            type DesktopNavigationProp = StackNavigationProp<
                HomeStackParamList,
                'Desktop'
            >;
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

    namespace Store {
        type Action = {
            payload?: {
                data: any;
                meta?: {
                    entity?: Entity;
                    method?: Method;
                    params?: string;
                    url?: string;
                };
            };
            type: string;
        };
        type Entity = '[NOTIFICATION]' | '[LOGOUT]' | '[USER]';
        type Reducer = {
            notification: Store.Models.Notification | null;
            user: {
                status: Status;
                data: Store.Models.User | null;
            };
        };
        type Status = 'ERROR' | 'FETCHING' | 'PENDING' | 'SUCCESS';
        namespace Models {
            type Notification = {
                status: 'error' | 'success';
                text: string;
            };
            type User = {
                createdAt: Date;
                currentProfilePicute?: string | null;
                defaultProfilePicture: string | null;
                hasNewNotification: boolean;
                id: string;
                pseudonym: string;
                role: 'admin' | 'moderator' | 'user';
                socialMediaUserName: string | null;
                userName: string;
            };
        }
    }

    namespace Style {
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
        type Pictograms =
            | 'arrow-left'
            | 'arrow-right'
            | 'logout-left'
            | 'logout-right'
            | 'moderation-fill'
            | 'moderation-stroke'
            | 'settings-fill'
            | 'settings-stroke'
            | 'ticket-fill'
            | 'ticket-stroke';
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
        namespace Variant {
            type Button = 'fill' | 'stroke';
            type Logo = 'large' | 'largest' | 'normal' | 'small' | 'smallest';
            type Pictogram = 'large' | 'normal' | 'small';
        }
    }
}
