import {
    BY_ID,
    GALERIE_PICTURES,
    GET,
    RESET,
    SET,
} from '#store/genericActionTypes';

export const GALERIES_PICTURES_BY_ID_RESET = `${GALERIE_PICTURES}${BY_ID} ${RESET}`;
export const GALERIE_PICTURES_BY_ID_SET = `${GALERIE_PICTURES}${BY_ID} ${SET}`;
export const GALERIE_PICTURES_GET = `${GALERIE_PICTURES} ${GET}`;
export const GALERIE_PICTURES_RESET = `${GALERIE_PICTURES} ${RESET}`;
