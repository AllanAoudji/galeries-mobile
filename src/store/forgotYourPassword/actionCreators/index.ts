import {
    FORGOT_YOUR_PASSWORD_FIELDS_ERROR_RESET,
    FORGOT_YOUR_PASSWORD_FIELDS_ERROR_UPDATE,
    FORGOT_YOUR_PASSWORD_RESET,
    FORGOT_YOUR_PASSWORD_STATUS_RESET,
    FORGOT_YOUR_PASSWORD_STATUS_UPDATE,
} from '#store/forgotYourPassword';
import { FORGOT_YOUR_PASSWORD } from '#store/genericActionTypes';

export const forgotYourPassword: (payload: { email: string }) => Store.Action =
    (payload) => ({
        meta: {},
        payload,
        type: FORGOT_YOUR_PASSWORD,
    });
export const resetForgotYourPassword: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: FORGOT_YOUR_PASSWORD_RESET,
});
export const resetForgotYourPasswordFieldsError: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: FORGOT_YOUR_PASSWORD_FIELDS_ERROR_RESET,
});
export const resetForgotYourPasswordStatus: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: FORGOT_YOUR_PASSWORD_STATUS_RESET,
});
export const updateForgotYourPasswordFieldsError: (payload: {
    email: string;
}) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: FORGOT_YOUR_PASSWORD_FIELDS_ERROR_UPDATE,
});
export const updateForgotYourPasswordStatus: (
    payload: Store.Status
) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: FORGOT_YOUR_PASSWORD_STATUS_UPDATE,
});
