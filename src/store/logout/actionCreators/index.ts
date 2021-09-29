import { LOGOUT } from '#store/genericActionTypes';
import {
    LOGOUT_STATUS_RESET,
    LOGOUT_STATUS_UPDATE,
} from '#store/logout/actionTypes';

// eslint-disable-next-line import/prefer-default-export
export const logout: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: LOGOUT,
});
export const resetLogoutStatus: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: LOGOUT_STATUS_RESET,
});
export const updateLogoutStatus: (payload: Store.Status) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: LOGOUT_STATUS_UPDATE,
});
