import {
    ME_DELETE,
    ME_FIELDS_ERROR_RESET,
    ME_FIELDS_ERROR_UPDATE,
    ME_GET,
    ME_ID_RESET,
    ME_ID_UPDATE,
    ME_LOADING_PUT_RESET,
    ME_LOADING_PUT_UPDATE,
    ME_PUT,
    ME_RESET,
    ME_STATUS_RESET,
    ME_STATUS_UPDATE,
} from '#store/me/actionTypes';

export const deleteMe: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: ME_DELETE,
});
export const getMe: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: ME_GET,
});
export const putMe: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: ME_PUT,
});
export const putMeHasNewNotification: () => Store.Action = () => ({
    meta: {},
    payload: { hasNewNotifications: true },
    type: ME_PUT,
});
export const putMePseudonym: (payload: { pseudonym: string }) => Store.Action =
    (payload) => ({
        meta: {},
        payload,
        type: ME_PUT,
    });
export const putMePassword: (payload: {
    confirmNewPassword: string;
    currentPassword: string;
    newPassword: string;
}) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: ME_PUT,
});
export const resetMe: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: ME_RESET,
});
export const resetMeFieldsError: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: ME_FIELDS_ERROR_RESET,
});
export const resetMeId: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: ME_ID_RESET,
});
export const resetMeLoadingPut: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: ME_LOADING_PUT_RESET,
});
export const resetMeStatus: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: ME_STATUS_RESET,
});
export const updateMeFieldsError: (payload: {
    confirmNewPassword?: string;
    currentPassword?: string;
    newPassword?: string;
    pseudonym?: string;
}) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: ME_FIELDS_ERROR_UPDATE,
});
export const updateMeId: (payload: string) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: ME_ID_UPDATE,
});
export const updateMeLoadingPut: (payload: Store.Status) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: ME_LOADING_PUT_UPDATE,
});
export const updateMeStatus: (payload: Store.Status) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: ME_STATUS_UPDATE,
});
