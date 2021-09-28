import { LOGOUT } from '#store/genericActionTypes';

// eslint-disable-next-line import/prefer-default-export
export const logout: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: LOGOUT,
});
