import { Easing } from 'react-native-reanimated';

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

export const END_POINT = {
    FORGOT_PASSWORD: '/users/password/',
    GALERIE: (id: string) => `/galeries/${id}`,
    GALERIE_COVER_PICTURE: (id: string) => `/galeries/${id}/coverPicture`,
    GALERIE_USERS: (id: string) => `/galeries/${id}/users`,
    GALERIES: '/galeries/',
    GET_ME: '/users/me',
    LOGIN: '/users/login/',
    LOGOUT: '/users/logout',
    REFRESH_TOKEN: '/users/refreshToken',
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
    USER_SHOULD_NOT_BE_AUTHENTICATED: 'you are already authenticated',
};

export const FIELD_REQUIREMENT = {
    GALERIE_DESCRIPTION_MAX_LENGTH: 200,
    GALERIE_NAME_MAX_LENGTH: 30,
    GALERIE_NAME_MIN_LENGTH: 3,
    PASSWORD_MIN_LENGTH: 8,
    PASSWORD_MAX_LENGTH: 30,
    USERNAME_MIN_LENGTH: 3,
    USERNAME_MAX_LENGTH: 30,
};

export const GLOBAL_STYLE = {
    BOTTOM_TAB_HEIGHT: 50,
    GALERIE_MODAL_HEIGHT: 279,
    HEADER_TAB_HEIGHT: 124,
};
