import {
    ALL_IDS,
    BY_ID,
    CURRENT,
    DELETE,
    END,
    GET,
    LOADING_DELETE,
    LOADING_POST,
    POST,
    PREVIOUS,
    REMOVE,
    RESET,
    SET,
    STATUS,
    TICKETS,
    UPDATE,
} from '#store/genericActionTypes';

export const TICKETS_ALL_IDS_REMOVE = `${TICKETS}${ALL_IDS} ${REMOVE}`;
export const TICKETS_ALL_IDS_RESET = `${TICKETS}${ALL_IDS} ${RESET}`;
export const TICKETS_ALL_IDS_SET = `${TICKETS}${ALL_IDS} ${SET}`;
export const TICKETS_BY_ID_REMOVE = `${TICKETS}${BY_ID} ${REMOVE}`;
export const TICKETS_BY_ID_RESET = `${TICKETS}${BY_ID} ${RESET}`;
export const TICKETS_BY_ID_SET = `${TICKETS}${BY_ID} ${SET}`;
export const TICKETS_CURRENT_RESET = `${TICKETS}${CURRENT} ${RESET}`;
export const TICKETS_CURRENT_UPDATE = `${TICKETS}${CURRENT} ${UPDATE}`;
export const TICKETS_DELETE = `${TICKETS} ${DELETE}`;
export const TICKETS_END_RESET = `${TICKETS}${END} ${RESET}`;
export const TICKETS_END_UPDATE = `${TICKETS}${END} ${UPDATE}`;
export const TICKETS_GET = `${TICKETS} ${GET}`;
export const TICKETS_LOADING_DELETE_RESET = `${TICKETS}${LOADING_DELETE} ${RESET}`;
export const TICKETS_LOADING_DELETE_UPDATE = `${TICKETS}${LOADING_DELETE} ${UPDATE}`;
export const TICKETS_LOADING_POST_RESET = `${TICKETS}${LOADING_POST} ${RESET}`;
export const TICKETS_LOADING_POST_UPDATE = `${TICKETS}${LOADING_POST} ${UPDATE}`;
export const TICKETS_POST = `${TICKETS} ${POST}`;
export const TICKETS_PREVIOUS_RESET = `${TICKETS}${PREVIOUS} ${RESET}`;
export const TICKETS_PREVIOUS_UPDATE = `${TICKETS}${PREVIOUS} ${UPDATE}`;
export const TICKETS_RESET = `${TICKETS} ${RESET}`;
export const TICKETS_STATUS_RESET = `${TICKETS}${STATUS} ${RESET}`;
export const TICKETS_STATUS_UPDATE = `${TICKETS}${STATUS} ${UPDATE}`;
