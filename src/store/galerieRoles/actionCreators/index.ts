import {
    GALERIE_ROLES_BY_ID_SET,
    GALERIE_ROLES_BY_ID_RESET,
    GALERIE_ROLES_PUT,
    GALERIE_ROLES_LOADING_PUT_RESET,
    GALERIE_ROLES_LOADING_PUT_UPDATE,
} from '#store/galerieRoles/actionTypes';

export const resetGalerieRolesById: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: GALERIE_ROLES_BY_ID_RESET,
});
export const putGalerieUserRole: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: GALERIE_ROLES_PUT,
});
export const resetGalerieRolesLoadingPut: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: GALERIE_ROLES_LOADING_PUT_RESET,
});
export const setGalerieRolesById: (
    galerieId: string,
    roles: { [key: string]: Store.Role }
) => Store.Action = (galerieId, role) => ({
    meta: {},
    payload: { [galerieId]: role },
    type: GALERIE_ROLES_BY_ID_SET,
});
export const updateGalerieRolesLoadingPut: (
    payload: Store.Status
) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: GALERIE_ROLES_LOADING_PUT_UPDATE,
});
