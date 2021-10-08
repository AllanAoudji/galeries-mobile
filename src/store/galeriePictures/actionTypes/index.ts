import {
    ALL_IDS,
    BY_ID,
    GALERIE_PICTURES,
    GET,
    ID,
    RESET,
    SET,
    STATUS,
    UPDATE,
} from '#store/genericActionTypes';

export const GALERIE_PICTURES_ALL_ID_RESET = `${GALERIE_PICTURES}${ALL_IDS} ${RESET}`;
export const GALERIE_PICTURES_ALL_ID_UPDATE = `${GALERIE_PICTURES}${ALL_IDS} ${UPDATE}`;
export const GALERIES_PICTURES_BY_ID_RESET = `${GALERIE_PICTURES}${BY_ID} ${RESET}`;
export const GALERIE_PICTURES_BY_ID_SET = `${GALERIE_PICTURES}${BY_ID} ${SET}`;
export const GALERIE_PICTURES_BY_ID_UPDATE = `${GALERIE_PICTURES}${BY_ID} ${UPDATE}`;
export const GALERIE_PICTURES_GET = `${GALERIE_PICTURES} ${GET}`;
export const GALERIE_PICTURES_ID_RESET = `${GALERIE_PICTURES}${ID} ${RESET}`;
export const GALERIE_PICTURES_ID_UPDATE = `${GALERIE_PICTURES}${ID} ${UPDATE}`;
export const GALERIE_PICTURES_RESET = `${GALERIE_PICTURES} ${RESET}`;
export const GALERIE_PICTURES_STATUS_RESET = `${GALERIE_PICTURES}${STATUS} ${RESET}`;
export const GALERIE_PICTURES_STATUS_UPDATE = `${GALERIE_PICTURES}${STATUS} ${UPDATE}`;