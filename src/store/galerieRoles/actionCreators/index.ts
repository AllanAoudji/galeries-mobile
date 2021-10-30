import {
    GALERIES_ROLES_BY_ID_SET,
    GALERIE_ROLES_BY_ID_RESET,
} from '#store/galerieRoles/actionTypes';

export const resetGalerieRolesById: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: GALERIE_ROLES_BY_ID_RESET,
});
export const setGalerieRolesById: (
    galerieId: string,
    roles: { [key: string]: Store.Role }
) => Store.Action = (galerieId, role) => ({
    meta: {},
    payload: { [galerieId]: role },
    type: GALERIES_ROLES_BY_ID_SET,
});
