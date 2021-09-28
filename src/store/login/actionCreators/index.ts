import { LOGIN } from '#store/genericActionTypes';
import {
    LOGIN_FIELD_ERRORS_RESET,
    LOGIN_FIELD_ERRORS_UPDATE,
    LOGIN_RESET,
    LOGIN_STATUS_RESET,
    LOGIN_STATUS_UPDATE,
} from '#store/login';

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
export const resetLoginStatus: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: LOGIN_STATUS_RESET,
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
export const updateLoginStatus: (payload: Store.Status) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: LOGIN_STATUS_UPDATE,
});
