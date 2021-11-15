import {
    ALL_IDS,
    BY_ID,
    CURRENT,
    DELETE,
    END,
    GET,
    LOADING_DELETE,
    NOTIFICATIONS,
    PREVIOUS,
    PUT,
    REFRESH,
    REMOVE,
    RESET,
    SET,
    STATUS,
    UPDATE,
} from '#store/genericActionTypes';

export const NOTIFICATIONS_ALL_IDS_SET = `${NOTIFICATIONS}${ALL_IDS} ${SET}`;
export const NOTIFICATIONS_ALL_IDS_REMOVE = `${NOTIFICATIONS}${ALL_IDS} ${REMOVE}`;
export const NOTIFICATIONS_ALL_IDS_RESET = `${NOTIFICATIONS}${ALL_IDS} ${RESET}`;
export const NOTIFICATIONS_BY_ID_REMOVE = `${NOTIFICATIONS}${BY_ID} ${REMOVE}`;
export const NOTIFICATIONS_BY_ID_RESET = `${NOTIFICATIONS}${BY_ID} ${RESET}`;
export const NOTIFICATIONS_BY_ID_SET = `${NOTIFICATIONS}${BY_ID} ${SET}`;
export const NOTIFICATIONS_BY_ID_UPDATE = `${NOTIFICATIONS}${BY_ID} ${UPDATE}`;
export const NOTIFICATIONS_CURRENT_RESET = `${NOTIFICATIONS}${CURRENT} ${RESET}`;
export const NOTIFICATIONS_CURRENT_UPDATE = `${NOTIFICATIONS}${CURRENT} ${UPDATE}`;
export const NOTIFICATIONS_DELETE = `${NOTIFICATIONS} ${DELETE}`;
export const NOTIFICATIONS_END_RESET = `${NOTIFICATIONS}${END} ${RESET}`;
export const NOTIFICATIONS_END_UPDATE = `${NOTIFICATIONS}${END} ${UPDATE}`;
export const NOTIFICATIONS_GET = `${NOTIFICATIONS} ${GET}`;
export const NOTIFICATIONS_LOADING_DELETE_RESET = `${NOTIFICATIONS}${LOADING_DELETE} ${RESET}`;
export const NOTIFICATIONS_LOADING_DELETE_UPDATE = `${NOTIFICATIONS}${LOADING_DELETE} ${UPDATE}`;
export const NOTIFICATIONS_PREVIOUS_RESET = `${NOTIFICATIONS}${PREVIOUS} ${RESET}`;
export const NOTIFICATIONS_PREVIOUS_UPDATE = `${NOTIFICATIONS}${PREVIOUS} ${UPDATE}`;
export const NOTIFICATIONS_PUT = `${NOTIFICATIONS} ${PUT}`;
export const NOTIFICATIONS_REFETCH = `${NOTIFICATIONS} ${REFRESH}`;
export const NOTIFICATIONS_RESET = `${NOTIFICATIONS} ${RESET}`;
export const NOTIFICATIONS_STATUS_RESET = `${NOTIFICATIONS}${STATUS} ${RESET}`;
export const NOTIFICATIONS_STATUS_UPDATE = `${NOTIFICATIONS}${STATUS} ${UPDATE}`;
