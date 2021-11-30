import { Dimensions, StatusBar } from 'react-native';
import { Easing } from 'react-native-reanimated';

import convertPixelToNum from '#helpers/convertPixelToNum';
import theme from '#helpers/theme';

const { width } = Dimensions.get('window');

const SIZE = (width - convertPixelToNum(theme.spacings.large) * 2) / 3;
const COL = 3;

export const ANIMATIONS = {
    TIMING_CONFIG: (duration = 400) => {
        'worklet';

        return { duration, easing: Easing.inOut(Easing.ease) };
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
    ADMIN: '/admin',
    ALLOW_NOTIFICATION: '/allowNotification',
    BETA: '/beta',
    BETA_KEYS: '/betaKeys',
    BLACKLISTS: '/blackLists',
    COMMENTS: '/comments',
    CONFIRMATION: '/confirmation',
    COVER_PICTURE: '/coverPicture',
    CURRENT_PROFILE_PICTURE: '/currentProfilePicture',
    EMAIL: '/email',
    FRAMES: '/frames',
    GALERIE_PICTURES: '/galeriePictures',
    GALERIES: '/galeries',
    HAS_NEW_FRAMES: '/hasNewFrames',
    HAS_NEW_NOTIFICATIONS: '/hasNewNotifications',
    INVITATIONS: '/invitations',
    LIKES: '/likes',
    LOGIN: '/login',
    LOGOUT: '/logout',
    ME: '/me',
    NOTIFICATIONS: '/notifications',
    PASSWORD: '/password',
    PROFILE_PICTURES: '/profilePictures',
    PSEUDONYM: '/pseudonym',
    REFRESH_TOKEN: '/refreshToken',
    REPORTS: '/reports',
    SEND: '/send',
    SIGNIN: '/signin',
    SUBSCRIBE: '/subscribe',
    TICKETS: '/tickets',
    UNSUBSCRIBE: '/unsubscribe',
    USERS: '/users',
};

export const ERROR_MESSAGE = {
    DEFAULT_ERROR_MESSAGE: 'something went wrong',
    FIELD_CANNOT_CONTAIN_SPACES: 'can not contain spaces',
    FIELD_IS_REQUIRED: 'is required',
    FIELD_MAX_LENGTH: (number: number) =>
        `should have a maximum length of ${number}`,
    FIELD_MIN_LENGTH: (number: number) =>
        `should have a minimum length of ${number}`,
    FIELD_SHOULD_BE_AN_EMAIL: 'should be a valid email',
    FIELD_SHOULD_BE_A_PASSWORD:
        'need at least on lowercase, one uppercase, one number and one special character',
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
    PSEUDONYM_MAX_LENGTH: 30,
    PSEUDONYM_MIN_LENGTH: 3,
    TICKET_BODY_MAX_LENGTH: 200,
    TICKET_BODY_MIN_LENGTH: 10,
    TICKET_HEADER_MIN_LENGTH: 5,
    TICKET_HEADER_MAX_LENGTH: 30,
    USERNAME_MIN_LENGTH: 3,
    USERNAME_MAX_LENGTH: 30,
};

export const GLOBAL_STYLE = {
    BOTTOM_TAB_HEIGHT: 65,
    COMMENTS_FOOTER_HEIGHT: 82,
    FRAME_COVER_PICTURE_SIZE: 45,
    FRAME_GALLERY_HEADER: 66 + (StatusBar.currentHeight || 0),
    FOOTER_LOGGER_HEIGHT: 56,
    GALERIE_CARD_HEIGHT: 249,
    GALERIE_CARD_COVER_PICTURE_HEIGHT: 170,
    GALERIE_TAB_BAR_COVER_PICTURE: 180,
    GALERIE_TAB_BAR_COVER_PICTURE_TEXT_MARGIN: 50,
    GALERIE_TAB_BAR_MENU: 67,
    HEADER_TAB_HEIGHT: 60 + (StatusBar.currentHeight || 0),
    INVITATION_CARD_HEIGHT: 95,
    MODERATION_NAVIGATION_BUTTON_HEIGHT: 100,
    NOTIFICATION_CARD_HEIGHT: 72,
    NOTIFICATION_CARD_IMAGE_SIZE: 45,
    NOTIFICATION_CARD_IMAGE_BORDER_RADIUS: 5,
    PROFILE_TAB_BAR_INFOS: 250,
    PROFILE_TAB_BAR_MENU: 67,
    SEARCH_BAR_HEIGHT: 62 + (StatusBar.currentHeight || 0),
    TOP_LEFT_PICTOGRAM_HEIGHT: 60,
    USER_CARD_HEIGHT: 65,
};

export const PRE_CODE = 'GALERIE_INVITATION ';

export const REPORT_REASONS: ReportReason[] = [
    'disinformation',
    'harassment',
    'hate',
    'intellectual property',
    'nudity',
];
