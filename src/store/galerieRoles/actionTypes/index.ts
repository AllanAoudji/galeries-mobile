import {
    BY_ID,
    GALERIE_ROLES,
    LOADING_PUT,
    PUT,
    RESET,
    SET,
    UPDATE,
} from '#store/genericActionTypes';

export const GALERIE_ROLES_BY_ID_RESET = `${GALERIE_ROLES}${BY_ID} ${RESET}`;
export const GALERIE_ROLES_BY_ID_SET = `${GALERIE_ROLES}${BY_ID} ${SET}`;
export const GALERIE_ROLES_BY_ID_UPDATE = `${GALERIE_ROLES}${BY_ID} ${UPDATE}`;
export const GALERIE_ROLES_PUT = `${GALERIE_ROLES} ${PUT}`;
export const GALERIE_ROLES_LOADING_PUT_RESET = `${GALERIE_ROLES}${LOADING_PUT} ${RESET}`;
export const GALERIE_ROLES_LOADING_PUT_UPDATE = `${GALERIE_ROLES}${LOADING_PUT} ${UPDATE}`;
