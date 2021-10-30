import {
    GALERIE_ROLES_RESET,
    GALERIES_ROLES_SET,
} from '#store/galerieRoles/actionTypes';

export const resetGalerieRoles: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: GALERIE_ROLES_RESET,
});
export const setGalerieRoles: (
    galerieId: string,
    roles: { [key: string]: Store.Role }
) => Store.Action = (galerieId, role) => ({
    meta: {},
    payload: { [galerieId]: role },
    type: GALERIES_ROLES_SET,
});
