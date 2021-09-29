import {
    BY_ID,
    GET,
    LIKES,
    POST,
    REMOVE,
    RESET,
    SET,
} from '#store/genericActionTypes';

export const LIKES_BY_ID_REMOVE = `${LIKES}${BY_ID} ${REMOVE}`;
export const LIKES_BY_ID_RESET = `${LIKES}${BY_ID} ${RESET}`;
export const LIKES_BY_ID_SET = `${LIKES}${BY_ID} ${SET}`;
export const LIKES_GET = `${LIKES} ${GET}`;
export const LIKES_POST = `${LIKES} ${POST}`;
export const LIKES_RESET = `${LIKES} ${RESET}`;
