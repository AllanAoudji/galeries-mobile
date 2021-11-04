import {
    ALL_IDS,
    BY_ID,
    END,
    GET,
    LIKES,
    POST,
    PREVIOUS,
    REFRESH,
    REMOVE,
    RESET,
    SET,
    STATUS,
} from '#store/genericActionTypes';

export const LIKES_ALL_IDS_SET = `${LIKES}${ALL_IDS} ${SET}`;
export const LIKES_ALL_IDS_RESET = `${LIKES}${ALL_IDS} ${RESET}`;
export const LIKES_BY_ID_REMOVE = `${LIKES}${BY_ID} ${REMOVE}`;
export const LIKES_BY_ID_RESET = `${LIKES}${BY_ID} ${RESET}`;
export const LIKES_BY_ID_SET = `${LIKES}${BY_ID} ${SET}`;
export const LIKES_END_SET = `${LIKES}${END} ${SET}`;
export const LIKES_END_RESET = `${LIKES}${END} ${RESET}`;
export const LIKES_GET = `${LIKES} ${GET}`;
export const LIKES_POST = `${LIKES} ${POST}`;
export const LIKES_PREVIOUS_RESET = `${LIKES}${PREVIOUS} ${RESET}`;
export const LIKES_PREVIOUS_SET = `${LIKES}${PREVIOUS} ${SET}`;
export const LIKES_REFRESH = `${LIKES} ${REFRESH}`;
export const LIKES_RESET = `${LIKES} ${RESET}`;
export const LIKES_STATUS_RESET = `${LIKES}${STATUS} ${RESET}`;
export const LIKES_STATUS_SET = `${LIKES}${STATUS} ${SET}`;
