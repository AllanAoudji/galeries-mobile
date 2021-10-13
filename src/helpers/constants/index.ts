import { Dimensions } from 'react-native';
import { Easing } from 'react-native-reanimated';

import convertPixelToNum from '#helpers/convertPixelToNum';
import theme from '#helpers/theme';

const { width } = Dimensions.get('window');

const SIZE = (width - convertPixelToNum(theme.spacings.normal) * 2) / 3;
const COL = 3;

export const ANIMATIONS = {
    TIMING_CONFIG: (duration = 400) => {
        'worklet';

        return {
            duration,
            easing: Easing.inOut(Easing.ease),
        };
    },
};

export const API = 'https://galeries-server.herokuapp.com/';

export const ASYNC_STORAGE = {
    AUTH_TOKEN_EXPIRES_IN: '@authToken_expiresIn',
    AUTH_TOKEN_TOKEN: '@authToken_token',
};

export const CLOSE_NOTIFICATION_DELAY = 2000;

export const DRAG_AND_DROP_UTILS = {
    COL,
    SIZE,
    getOrder(x: number, y: number) {
        'worklet';

        const col = Math.round(x / SIZE);
        const row = Math.round(y / SIZE);

        return row * COL + col;
    },
    getPosition(order: number) {
        'worklet';

        return {
            x: (order % COL) * SIZE,
            y: Math.floor(order / COL) * SIZE,
        };
    },
};

export const END_POINT = {
    GALERIE_PICTURES: '/galeriePictures',
    COVER_PICTURE: '/coverPicture',
    USERS: '/users',
    ME: '/me',
    CURRENT_PROFILE_PICTURE: '/currentProfilePicture',
    PROFILE_PICTURES: '/profilePictures',
    Me: '/me',
    LIKE_ID: (id: string) => `/likes/${id}/`,
    COMMENTS: '/comments',
    COMMENT_ID: (id: string) => `/comments/${id}/`,
    FRAME_COMMENTS: (id: string) => `/frames/${id}/comments/`,
    FORGOT_PASSWORD: '/users/password/',
    FRAMES: '/frames',
    FRAME: (id: string) => `/frames/${id}/`,
    FRAMES_GALERIE_PICTURES: (id: string) => `/frames/${id}/galeriePictures/`,
    GALERIE: (id: string) => `/galeries/${id}/`,
    GALERIE_COVER_PICTURE: (id: string) => `/galeries/${id}/coverPicture/`,
    GALERIE_FRAMES: (id: string) => `/galeries/${id}/frames/`,
    GALERIE_USERS: (id: string) => `/galeries/${id}/users/`,
    GALERIES: '/galeries/',
    GET_GALERIE_USERS: (id: string) => `/galeries/${id}/users/`,
    GET_ME: '/users/me/',
    GET_ME_CURRENT_PROFILE_PICTURE: '/users/me/currentProfilePicture',
    GET_USER_CURRENT_PROFILE_PICTURE: (id: string) =>
        `/users/${id}/currentProfilePicture`,
    GET_USER_ID: (id: string) => `/users/${id}/`,
    LIKES: '/likes',
    LOGIN: '/users/login/',
    LOGOUT: '/users/logout/',
    REFRESH_TOKEN: '/users/refreshToken/',
    SIGNIN: '/users/signin/beta/',
};

export const ERROR_MESSAGE = {
    DEFAULT_ERROR_MESSAGE: 'something went wrong',
    FIELD_CANNOT_CONTAIN_SPACES: 'can not contain spaces',
    FIELD_IS_REQUIRED: 'is required',
    FIELD_MAX_LENGTH: (number: number) =>
        `should have a maximum length of ${number}`,
    FIELD_MIN_LENGTH: (number: number) =>
        `should have a maximum length of ${number}`,
    FIELD_SHOULD_BE_AN_EMAIL: 'should be a valid email',
    FIELD_SHOULD_BE_A_PASSWORD:
        'need at least on lowercase, one uppercase, one number and one special char',
    FIELD_SHOULD_MATCH: (type: 'password') => `must match ${type}`,
    METHOD_NOT_FOUND: 'Method not found',
    USER_SHOULD_NOT_BE_AUTHENTICATED: 'you are already authenticated',
};

export const FIELD_REQUIREMENT = {
    COMMENT_MAX_LENGTH: 200,
    COMMENT_MIN_LENGTH: 1,
    FRAME_DESCRIPTION_MAX_LENGTH: 200,
    GALERIE_DESCRIPTION_MAX_LENGTH: 200,
    GALERIE_NAME_MAX_LENGTH: 30,
    GALERIE_NAME_MIN_LENGTH: 3,
    PASSWORD_MIN_LENGTH: 8,
    PASSWORD_MAX_LENGTH: 30,
    USERNAME_MIN_LENGTH: 3,
    USERNAME_MAX_LENGTH: 30,
};

export const GLOBAL_STYLE = {
    BOTTOM_TAB_HEIGHT: 65,
    GALERIE_MODAL_HEIGHT: 239,
    GALERIE_TAB_BAR_COVER_PICTURE: 200,
    HEADER_TAB_HEIGHT: 95,
    TOP_LEFT_PICTOGRAM_HEIGHT: 60,
    FRAME_COVER_PICTURE_SIZE: 45,
};
