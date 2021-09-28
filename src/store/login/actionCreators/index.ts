import { LOGIN } from '#store/genericActionTypes';
import {
    LOGIN_FIELD_ERRORS_RESET,
    LOGIN_FIELD_ERRORS_UPDATE,
    LOGIN_RESET,
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
