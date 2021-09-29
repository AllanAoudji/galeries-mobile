import {
    ME_DELETE,
    ME_GET,
    ME_ID_RESET,
    ME_ID_UPDATE,
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
export const resetMe: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: ME_RESET,
});
export const resetMeId: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: ME_ID_RESET,
});
export const resetMeStatus: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: ME_STATUS_RESET,
});
export const updateMeId: (payload: string) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: ME_ID_UPDATE,
});
export const updateMeStatus: (payload: Store.Status) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: ME_STATUS_UPDATE,
});
