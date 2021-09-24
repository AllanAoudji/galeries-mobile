import { combineReducers, Middleware } from 'redux';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FIELDS_ERROR, LOGIN, RESET, UPDATE } from '#store/genericActionTypes';
import { apiRequest, API_ERROR, API_SUCCESS } from '#store/api';
import { ASYNC_STORAGE, END_POINT, ERROR_MESSAGE } from '#helpers/constants';
import { dispatchErrorNotification } from '#store/notification';
import { getMe } from '#store/me';
import { setLoading } from '#store/loading';

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Action types
// ----------------------------------
// ----------------------------------
// ----------------------------------
const LOGIN_RESET = `${LOGIN} ${RESET}`;

const LOGIN_FIELD_ERRORS_UPDATE = `${LOGIN}${FIELDS_ERROR} ${UPDATE}`;
const LOGIN_FIELD_ERRORS_RESET = `${LOGIN}${FIELDS_ERROR} ${RESET}`;

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Action creators
// ----------------------------------
// ----------------------------------
// ----------------------------------
export const login: (payload: {
    password: string;
    userNameOrEmail: string;
}) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: LOGIN,
});
export const resetLogin: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: LOGIN_RESET,
});
export const resetLoginFieldErrors: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: LOGIN_FIELD_ERRORS_RESET,
});
export const updateLoginFieldsError: (payload: {
    password?: string;
    userNameOrEmail?: string;
}) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: LOGIN_FIELD_ERRORS_UPDATE,
});

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Middlewared
// ----------------------------------
// ----------------------------------
// ----------------------------------
const getMeId = (getState: () => Store.Reducer) => getState().me.id;
const getUser = (getState: () => Store.Reducer, userId: string) =>
    getState().users.byId[userId];

const errorLoginMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (
            typeof action.payload === 'object' &&
            (typeof action.payload.password === 'string' ||
                typeof action.payload.userNameOrEmail === 'string') &&
            action.type === `${LOGIN} ${API_ERROR}`
        )
            dispatch(updateLoginFieldsError(action.payload));
        else dispatchErrorNotification(dispatch, action);
        dispatch(setLoading(false));
    };
const loginMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (
            typeof action.payload === 'object' &&
            typeof action.payload.password === 'string' &&
            typeof action.payload.userNameOrEmail &&
            action.type === LOGIN
        ) {
            const meId = getMeId(getState);
            if (meId) {
                const user = getUser(getState, meId);
                if (user)
                    // TODO: Error in constants
                    dispatchErrorNotification(
                        dispatch,
                        'you already logged in.'
                    );
                else dispatch(getMe());
            } else {
                dispatch(setLoading(true));
                dispatch(
                    apiRequest({
                        meta: {
                            entity: LOGIN,
                            method: 'POST',
                            url: END_POINT.LOGIN,
                        },
                        payload: action.payload,
                    })
                );
            }
        }
    };
const resetLoginMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === LOGIN_RESET) dispatch(resetLoginFieldErrors());
    };
const successLoginMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${LOGIN} ${API_SUCCESS}`) {
            const { expiresIn, token } = action.payload.data.data;
            if (typeof expiresIn === 'string' && typeof token === 'string') {
                const normalizeExpiredIn = moment()
                    .add(expiresIn, 's')
                    .valueOf()
                    .toString();
                AsyncStorage.setItem(
                    ASYNC_STORAGE.AUTH_TOKEN_EXPIRES_IN,
                    normalizeExpiredIn
                )
                    .then(() =>
                        AsyncStorage.setItem(
                            ASYNC_STORAGE.AUTH_TOKEN_TOKEN,
                            token
                        )
                    )
                    .then(() => dispatch(getMe()));
            } else {
                dispatchErrorNotification(
                    dispatch,
                    ERROR_MESSAGE.DEFAULT_ERROR_MESSAGE
                );
            }
            dispatch(setLoading(false));
        }
    };

export const loginMiddlewares = [
    errorLoginMiddleware,
    loginMiddleware,
    resetLoginMiddleware,
    successLoginMiddleware,
];

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Reducers
// ----------------------------------
// ----------------------------------
// ----------------------------------
const loginFieldsErrorInitialState: {
    password?: string;
    userNameOrEmail?: string;
} = {};
const loginFieldsErrorReducer = (
    state = loginFieldsErrorInitialState,
    action: Store.Action
) => {
    switch (action.type) {
        case LOGIN_FIELD_ERRORS_RESET:
            return loginFieldsErrorInitialState;
        case LOGIN_FIELD_ERRORS_UPDATE:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Combined reducers
// ----------------------------------
// ----------------------------------
// ----------------------------------
export const loginReducer = combineReducers({
    fieldsError: loginFieldsErrorReducer,
});

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Selectors
// ----------------------------------
// ----------------------------------
// ----------------------------------
export const selectLoginFieldsError = (state: Store.Reducer) =>
    state.login.errors;
