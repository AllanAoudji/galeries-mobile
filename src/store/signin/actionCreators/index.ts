import { SIGNIN } from '#store/genericActionTypes';
import {
    SIGNIN_FIELDS_ERROR_RESET,
    SIGNIN_FIELDS_ERROR_UPDATE,
    SIGNIN_RESET,
    SIGNIN_STATUS_RESET,
    SIGNIN_STATUS_UPDATE,
} from '#store/signin';

export const signin: (payload: {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
    betaKey: string;
}) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: SIGNIN,
});
export const resetSignin: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: SIGNIN_RESET,
});
export const resetSigninFieldsError: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: SIGNIN_FIELDS_ERROR_RESET,
});
export const resetSigninStatus: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: SIGNIN_STATUS_RESET,
});
export const updateSigninFieldsError: (payload: {
    userName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    betaKey?: string;
}) => Store.Action = () => ({
    meta: {},
    payload: {},
    type: SIGNIN_FIELDS_ERROR_UPDATE,
});
export const updateSigninStatus: (payload: Store.Status) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: SIGNIN_STATUS_UPDATE,
});
