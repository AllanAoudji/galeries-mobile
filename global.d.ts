import { DrawerNavigationProp } from '@react-navigation/drawer';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Method } from 'axios';
import { NavigatorScreenParams } from '@react-navigation/native';

declare global {
    namespace DragAndDrop {
        type Order = number;
        interface Positions {
            [id: string]: Order;
        }
    }
    namespace Screen {
        namespace CreateFrameStack {
            type ParamList = {
                AddDescription: undefined;
                AddPictures: undefined;
                CreateFrameCamera: undefined;
                CreateFrameGallery: undefined;
            };
            type AddDescriptionNavigationProp = StackNavigationProp<
                ParamList,
                'AddDescription'
            >;
            type AddPicturesNavigationProp = StackNavigationProp<
                ParamList,
                'AddPictures'
            >;
            type CreateFrameCameraNavigationProp = StackNavigationProp<
                ParamList,
                'Camera'
            >;
            type CreateFrameGalleryNavigationProp = StackNavigationProp<
                ParamList,
                'CreateFrameGallery'
            >;
        }
        namespace DesktopBottomTab {
            type ParamList = {
                Comments: undefined;
                CreateFrame: NavigatorScreenParams<CreateFrameStack.ParamList>;
                CreateGalerie: undefined;
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
            type CreateFrameProp = BottomTabNavigationProp<
                ParamList,
                'CreateFrame'
            >;
            type CreateGalerieProp = BottomTabNavigationProp<
                ParamList,
                'CreateGalerie'
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
        namespace RootStack {
            type ParamList = {
                Desktop: NavigatorScreenParams<DesktopDrawer.ParamList>;
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
            payload: any;
            meta: Meta;
            type: string;
        };
        type Entity =
            | '[COMMENTS]'
            | '[FORGOT YOUR PASSWORD]'
            | '[FRAMES]'
            | '[GALERIES]'
            | '[GALERIE PICTURES]'
            | '[LIKES]'
            | '[LOADING]'
            | '[LOGIN]'
            | '[LOGOUT]'
            | '[NOTIFICATION]'
            | '[ME]'
            | '[PROFILE PICTURE]'
            | '[SIGNIN]'
            | '[UI]'
            | '[USERS]';
        type Meta = {
            end?: boolean;
            entity?: Entity;
            method?: Method;
            params?: string;
            query?: { [key: string]: string };
            url?: string;
        };
        type Reducer = {
            comments: {
                byId: { [key: string]: Store.Models.Comment };
                loading: {
                    delete: Store.Status;
                    post: Store.Status;
                };
            };
            forgotYourPassword: {
                fieldsError: {
                    email?: string;
                };
                status: Store.Status;
            };
            frames: {
                allIds: string[];
                byId: { [key: string]: Store.Models.Frame };
                current: string | null;
                end: boolean;
                fieldsError: { description?: string };
                loading: {
                    delete: Store.Status;
                    post: Store.Status;
                    put: Store.Status;
                };
                previous: string;
                status: Store.Status;
            };
            galeries: {
                allIds: { [key: string]: string[] };
                byId: { [key: string]: Store.Models.Galerie };
                current: string | null;
                end: { [key: string]: boolean };
                filterName: string;
                fieldsError: { description?: string; name?: string };
                loading: {
                    delete: Store.Status;
                    post: Store.Status;
                    put: Store.Status;
                };
                previous: { [key: string]: string | null };
                status: { [key: string]: Store.Status };
            };
            galeriePictures: {
                byId: { [key: string]: Store.Models.GaleriePicture };
            };
            likes: {
                byId: { [key: string]: Store.Models.Like };
            };
            login: {
                fieldsError: {
                    password?: undefined;
                    userNameOrEmail?: undefined;
                };
                status: Store.Status;
            };
            logout: {
                status: Store.Status;
            };
            me: {
                id: string | null;
                status: Status;
            };
            profilePictures: {
                allIds: string[];
                byId: { [key: string]: Store.Models.ProfilePicture };
                current: string | null;
                end: boolean;
                loading: {
                    delete: Store.Status;
                    post: Store.Status;
                };
                previous: string;
                status: Store.Status;
            };
            notification: Store.Models.Notification | null;
            signin: {
                fieldsError: {
                    userName: string;
                    email: string;
                    password: string;
                    confirmPassword: string;
                    betaKey: string;
                };
                status: Store.Status;
            };
            users: {
                allIds: string[];
                byId: { [key: string]: Store.Models.User };
                current: string | null;
                end: boolean;
                previous: string;
                status: Store.Status;
            };
        };
        type Role = 'admin' | 'moderator' | 'user';
        type Status =
            | 'ERROR'
            | 'INITIAL_LOADING'
            | 'LOADING'
            | 'PENDING'
            | 'SUCCESS';
        namespace Models {
            type Comment = {
                autoIncrementId: string;
                body: string;
                comments: {
                    allIds?: string[];
                    end: boolean;
                    previousComment?: string;
                    status: Store.Status;
                };
                createdAt: string;
                frameId: string;
                id: string;
                level: number;
                numOfComments: number;
                updatedAt: string;
                userId: string;
            };
            type CommentPopulated = Comment & { user: UserPopulated };
            type Frame = {
                autoIncrementId: string;
                comments?: {
                    allIds: string[];
                    end: boolean;
                    previous?: string;
                    status: Store.Status;
                };
                createdAt: string;
                description: string;
                galerieId: string;
                galeriePictures?: {
                    allIds: string[];
                    status: Store.Status;
                };
                id: string;
                likes?: {
                    allIds: string[];
                    end: boolean;
                    previous?: string;
                    status: Store.Status;
                };
                liked: boolean;
                numOfComments: string;
                numOfLikes: string;
                updatedAt: string;
                userId: string;
            };
            type Galerie = {
                allowNotification: boolean;
                createdAt: Date;
                coverPicture?: {
                    id: string | null;
                    status: Store.Status;
                };
                defaultCoverPicture: string;
                description: string;
                frames?: {
                    allIds: string[];
                    end: boolean;
                    previous?: string;
                    status: Store.Status;
                };
                hasNewFrames: boolean;
                hiddenName: string;
                id: string;
                name: string;
                numOfUsers: number;
                role: Role;
                users?: {
                    allIds: string[];
                    end: boolean;
                    previous?: string;
                    status: Store.Status;
                };
            };
            type GaleriePicture = {
                createdAt: string;
                cropedImage: Image & { cachedSignedUrl: string };
                current: boolean;
                frameId: string;
                id: string;
                index: string;
                originalImage: Image & { cachedSignedUrl: string };
                pendingHexes: string;
                updatedAt: string;
            };
            type Image = {
                id: string;
                format: string;
                height: number;
                signedUrl: string;
                size: number;
                width: number;
            };
            type Like = {
                autoIncrementId: string;
                createdAt: string;
                frameId: string;
                id: string;
                updatedAt: string;
                userId: string;
            };
            type LikePopulated = Like & { user: UserPopulated };
            type Notification = {
                status: 'error' | 'success';
                text: string;
            };
            type ProfilePicture = {
                autoIncrementId: string;
                createdAt: string;
                cropedImage: Image & { cachedSignedUrl: string };
                current: boolean;
                frameId: string;
                id: string;
                index: string;
                originalImage: Image & { cachedSignedUrl: string };
                pendingHexes: string;
                updatedAt: string;
            };
            type User = {
                createdAt: Date;
                currentProfilePicture?: {
                    id: string | null;
                    status: Store.Status;
                };
                defaultProfilePicture: string | null;
                hasNewNotification?: boolean;
                id: string;
                isBlackListed: boolean;
                pseudonym: string;
                role: Role;
                socialMediaUserName: string | null;
                userName: string;
            };
            type UserPopulated = User & {
                currentProfilePicture?: ProfilePicture;
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
            11: string;
            12: string;
            14: string;
            18: string;
            24: string;
            36: string;
            48: string;
            64: string;
        };
        type JustifyContent = 'center' | 'flex-end' | 'flex-start';
        type Pictograms =
            | 'add/subscribe-fill'
            | 'add/subscribe-stroke'
            | 'arrow-left'
            | 'arrow-right'
            | 'camera-fill'
            | 'camera-stroke'
            | 'comments-fill'
            | 'comments-stroke'
            | 'download'
            | 'edit-fill'
            | 'edit-stroke'
            | 'flash-off'
            | 'flash-on'
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
            | 'option-horizontal'
            | 'option-vertical'
            | 'plus'
            | 'profile-fill'
            | 'profile-stroke'
            | 'search'
            | 'settings-fill'
            | 'settings-stroke'
            | 'switch'
            | 'ticket-fill'
            | 'ticket-stroke'
            | 'upload'
            | 'valid';
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
            type ProfilePicture = 'small' | 'normal' | 'large';
        }
    }
}
