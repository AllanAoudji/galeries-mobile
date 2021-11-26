import {
    CONFIRM_ACCOUNT_FIELDS_ERROR_RESET,
    CONFIRM_ACCOUNT_FIELDS_ERROR_UPDATE,
    CONFIRM_ACCOUNT_POST,
    CONFIRM_ACCOUNT_RESET,
    CONFIRM_ACCOUNT_STATUS_RESET,
    CONFIRM_ACCOUNT_STATUS_UPDATE,
} from '#store/confirmAccount/actionTypes';

export const postConfirmAccount: (payload: { email: string }) => Store.Action =
    (payload) => ({
        meta: {},
        payload,
        type: CONFIRM_ACCOUNT_POST,
    });
export const resetConfirmAccount: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: CONFIRM_ACCOUNT_RESET,
});
export const resetConfirmAccountFieldsError: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: CONFIRM_ACCOUNT_FIELDS_ERROR_RESET,
});
export const resetConfirmAccountState: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: CONFIRM_ACCOUNT_STATUS_RESET,
});
export const updateConfirmAccountFieldsError: (payload: {
    email?: string;
}) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: CONFIRM_ACCOUNT_FIELDS_ERROR_UPDATE,
});
export const updateConfirmAccountState: (
    payload: Store.Status
) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: CONFIRM_ACCOUNT_STATUS_UPDATE,
});
