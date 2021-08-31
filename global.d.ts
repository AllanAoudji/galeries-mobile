import { DrawerNavigationProp } from '@react-navigation/drawer';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Method } from 'axios';
import { NavigatorScreenParams } from '@react-navigation/native';

declare global {
    namespace Screen {
        namespace CreateFrameStack {
            type ParamList = {
                AddDescription: undefined;
                AddPictures: undefined;
                Camera: undefined;
            };
            type AddDescriptionNavigationProp = StackNavigationProp<
                ParamList,
                'AddDescription'
            >;
            type AddPicturesNavigationProp = StackNavigationProp<
                ParamList,
                'AddPictures'
            >;
            type CameraNavigationProp = StackNavigationProp<
                ParamList,
                'Camera'
            >;
        }
        namespace DesktopBottomTab {
            type ParamList = {
                Comments: undefined;
                Galerie: undefined;
                Galeries: undefined;
                Home: undefined;
                Likes: undefined;
                Notifications: undefined;
                Profile: undefined;
            };
            type CommentsNavigationProp = BottomTabNavigationProp<
                ParamList,
                'Comments'
            >;
            type GalerieNavigationProp = BottomTabNavigationProp<
                ParamList,
                'Galerie'
            >;
            type GaleriesNavigationProp = BottomTabNavigationProp<
                ParamList,
                'Galeries'
            >;
            type HomeNavigationProp = BottomTabNavigationProp<
                ParamList,
                'Home'
            >;
            type LikesNavigationProp = BottomTabNavigationProp<
                ParamList,
                'Likes'
            >;
            type NotificationNavigationProp = BottomTabNavigationProp<
                ParamList,
                'Notifications'
            >;
            type ProfileNavigationProp = BottomTabNavigationProp<
                ParamList,
                'Profile'
            >;
        }
        namespace DesktopDrawer {
            type ParamList = {
                Main: NavigatorScreenParams<DesktopBottomTab.ParamList>;
                Moderation: undefined;
                SendTicket: undefined;
                Settings: undefined;
            };
            type MainScreenNavigationProp = DrawerNavigationProp<
                ParamList,
                'Main'
            >;
            type ModerationScreenNavigationProp = DrawerNavigationProp<
                ParamList,
                'Moderation'
            >;
            type SendTicketScreenNavigationProp = DrawerNavigationProp<
                ParamList,
                'SendTicket'
            >;
            type SettingsScreenNavigationProp = DrawerNavigationProp<
                ParamList,
                'Settings'
            >;
        }
        namespace DesktopStack {
            type ParamList = {
                CreateFrame: undefined;
                CreateGalerie: undefined;
                Desktop: NavigatorScreenParams<DesktopDrawer.ParamList>;
            };
            type CreateFrameNavigationProp = StackNavigationProp<
                ParamList,
                'CreateFrame'
            >;
            type CreateGalerieNavigationProp = StackNavigationProp<
                ParamList,
                'CreateGalerie'
            >;
            type DesktopNavigationProp = StackNavigationProp<
                ParamList,
                'Desktop'
            >;
        }
        namespace RootStack {
            type ParamList = {
                Desktop: NavigatorScreenParams<DesktopStack.ParamList>;
                ForgotYourPassword: undefined;
                Landing: undefined;
                Login: undefined;
                Signin: undefined;
            };
            type DesktopNavigationProp = StackNavigationProp<
                ParamList,
                'Desktop'
            >;
            type ForgotYourPasswordNavigationProp = StackNavigationProp<
                ParamList,
                'ForgotYourPassword'
            >;
            type LandingScreenNavigationProp = StackNavigationProp<
                ParamList,
                'Landing'
            >;
            type LoginScreenNavigationProp = StackNavigationProp<
                HomeStackParamList,
                'Login'
            >;
            type SigninScreenNavigationProp = StackNavigationProp<
                ParamList,
                'Signin'
            >;
        }
    }

    namespace Store {
        type Action = {
            payload: {
                data: any;
                meta: Meta;
            };
            type: string;
        };
        type Entity =
            | '[FRAMES]'
            | '[GALERIES]'
            | '[NOTIFICATION]'
            | '[LOGOUT]'
            | '[UI STATES]'
            | '[USER]';
        type Meta = {
            end?: boolean;
            entity?: Entity;
            method?: Method;
            params?: string;
            query?: { [key: string]: string };
            url?: string;
        };
        type Reducer = {
            UIStates: {
                currentGalerieId?: string;
                filters: {
                    galeries: {
                        name: string;
                    };
                };
            };
            frames: {
                allIds: string[];
                byId: { [key: string]: Store.Models.Frame };
                end: boolean;
                previousFrame?: string;
                status: Store.Status;
            };
            galeries: {
                allIdsByName: {
                    [key: string]: {
                        allIds: string[];
                        end: boolean;
                        previousGalerie?: string;
                        status: Store.Status;
                    };
                };
                byId: { [key: string]: Store.Models.Galerie };
            };
            notification: Store.Models.Notification | null;
            user: {
                status: Status;
                data: Store.Models.User | null;
            };
        };
        type Role = 'admin' | 'moderator' | 'user';
        type Status = 'ERROR' | 'FETCHING' | 'PENDING' | 'SUCCESS';
        namespace Models {
            type Frame = {
                createdAt: string;
            };
            type Galerie = {
                allowNotification: boolean;
                createdAt: Date;
                currentCoverPicture?: string | null;
                defaultCoverPicture: string;
                description: string;
                frames: {
                    allIds: string[];
                    end: boolean;
                    previousFrame?: string;
                    status: Store.Status;
                };
                hasNewFrames: boolean;
                hiddenName: string;
                name: string;
                numOfUsers: number;
                role: Role;
                users: {
                    allIds: string[];
                    end: boolean;
                    previousFrame?: string;
                    status: Store.Status;
                };
            };
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
                role: Role;
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
            | 'add/subscribe-fill'
            | 'add/subscribe-stroke'
            | 'arrow-left'
            | 'arrow-right'
            | 'camera-fill'
            | 'camera-stroke'
            | 'download'
            | 'edit-fill'
            | 'edit-stroke'
            | 'galeries-fill'
            | 'galeries-stroke'
            | 'hamburger-menu'
            | 'heart-fill'
            | 'heart-stroke'
            | 'home-fill'
            | 'home-stroke'
            | 'logout-left'
            | 'logout-right'
            | 'moderation-fill'
            | 'moderation-stroke'
            | 'plus'
            | 'profile-fill'
            | 'profile-stroke'
            | 'search'
            | 'settings-fill'
            | 'settings-stroke'
            | 'ticket-fill'
            | 'ticket-stroke'
            | 'upload';
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
