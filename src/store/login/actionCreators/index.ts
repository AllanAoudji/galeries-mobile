import { LOGIN } from '#store/genericActionTypes';
import {
    LOGIN_FIELDS_ERROR_RESET,
    LOGIN_FIELDS_ERROR_UPDATE,
    LOGIN_RESET,
    LOGIN_STATUS_RESET,
    LOGIN_STATUS_UPDATE,
} from '#store/login/actionTypes';

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
    type: LOGIN_FIELDS_ERROR_RESET,
});
export const resetLoginStatus: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: LOGIN_STATUS_RESET,
});
export const updateLoginFieldsError: (payload: {
    password?: string;
    userNameOrEmail?: string;
}) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: LOGIN_FIELDS_ERROR_UPDATE,
});
export const updateLoginStatus: (payload: Store.Status) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: LOGIN_STATUS_UPDATE,
});
