import {
    USERS_ALL_IDS_REMOVE,
    USERS_ALL_IDS_RESET,
    USERS_ALL_IDS_SET,
    USERS_BY_ID_RESET,
    USERS_BY_ID_SET,
    USERS_BY_ID_UPDATE,
    USERS_CURRENT_RESET,
    USERS_CURRENT_UPDATE,
    USERS_END_RESET,
    USERS_END_UPDATE,
    USERS_GET,
    USERS_PREVIOUS_RESET,
    USERS_PREVIOUS_UPDATE,
    USERS_RESET,
    USERS_STATUS_RESET,
    USERS_STATUS_UPDATE,
} from '#store/users/actionTypes';

export const getGalerieUsers: (galerieId: string) => Store.Action = (
    galerieId
) => ({
    meta: { query: { galerieId } },
    payload: {},
    type: USERS_GET,
});
export const getUserId: (payload: string) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: USERS_GET,
});
export const getUsers: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: USERS_GET,
});
export const removeGalerieUserAllIds: (
    galerieId: string,
    payload: string[]
) => Store.Action = (galerieId, payload) => ({
    meta: { query: { galerieId } },
    payload,
    type: USERS_ALL_IDS_REMOVE,
});
export const removeUsersAllIds: (payload: string) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: USERS_ALL_IDS_REMOVE,
});
export const resetUsers: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: USERS_RESET,
});
export const resetUsersAllIds: () => Store.Action = () => ({
    payload: {},
    meta: {},
    type: USERS_ALL_IDS_RESET,
});
export const resetUsersById: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: USERS_BY_ID_RESET,
});
export const resetUserCurrent: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: USERS_CURRENT_RESET,
});
export const resetUsersEnd: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: USERS_END_RESET,
});
export const resetUsersPrevious: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: USERS_PREVIOUS_RESET,
});
export const resetUsersStatus: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: USERS_STATUS_RESET,
});
export const setUsersAllIds: (payload: string[]) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: USERS_ALL_IDS_SET,
});
export const setGalerieUsersAllIds: (
    galerieId: string,
    payload: string[]
) => Store.Action = (galerieId, payload) => ({
    meta: { query: { galerieId } },
    payload,
    type: USERS_ALL_IDS_SET,
});
export const setUsersById: (payload: {
    [key: string]: Store.Models.User;
}) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: USERS_BY_ID_SET,
});
export const updateUsersById: (payload: Store.Models.User) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: USERS_BY_ID_UPDATE,
});
export const updateUserCurrent: (payload: string) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: USERS_CURRENT_UPDATE,
});
export const updateGalerieUsersEnd: (
    galerieId: string,
    payload: boolean
) => Store.Action = (galerieId, payload) => ({
    meta: { query: { galerieId } },
    payload,
    type: USERS_END_UPDATE,
});
export const updateUsersEnd: (payload: boolean) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: USERS_END_UPDATE,
});
export const updateGalerieUsersPrevious: (
    galerieId: string,
    payload: string
) => Store.Action = (galerieId, payload) => ({
    meta: { query: { galerieId } },
    payload,
    type: USERS_PREVIOUS_UPDATE,
});
export const updateUsersPrevious: (payload: string) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: USERS_PREVIOUS_UPDATE,
});
export const updateGalerieUsersStatus: (
    galerieId: string,
    payload: Store.Status
) => Store.Action = (galerieId, payload) => ({
    meta: { query: { galerieId } },
    payload,
    type: USERS_STATUS_UPDATE,
});
export const updateUsersStatus: (payload: Store.Status) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: USERS_STATUS_UPDATE,
});
