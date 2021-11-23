import {
    RESET_PASSWORD_CURRENT_RESET,
    RESET_PASSWORD_CURRENT_UPDATE,
    RESET_PASSWORD_FIELD_ERRORS_RESET,
    RESET_PASSWORD_FIELD_ERRORS_UPDATE,
    RESET_PASSWORD_POST,
    RESET_PASSWORD_RESET,
    RESET_PASSWORD_STATUS_RESET,
    RESET_PASSWORD_STATUS_UPDATE,
} from '#store/resetPassword/actionTypes';

export const postResetPassword: (payload: { email: string }) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: RESET_PASSWORD_POST,
});
export const resetResetPasswordCurrent: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: RESET_PASSWORD_CURRENT_RESET,
});
export const resetResetPassword: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: RESET_PASSWORD_RESET,
});
export const resetResetPasswordFieldErrors: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: RESET_PASSWORD_FIELD_ERRORS_RESET,
});
export const resetResetPasswordStatus: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: RESET_PASSWORD_STATUS_RESET,
});
export const updateResetPasswordCurrent: (payload: string) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: RESET_PASSWORD_CURRENT_UPDATE,
});
export const updateResetPasswordFieldErrors: (payload: {
    email?: string;
}) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: RESET_PASSWORD_FIELD_ERRORS_UPDATE,
});
export const updateResetPasswordStatus: (
    payload: Store.Status
) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: RESET_PASSWORD_STATUS_UPDATE,
});
