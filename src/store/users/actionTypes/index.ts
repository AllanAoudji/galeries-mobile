import {
    BY_ID,
    CURRENT,
    GET,
    RESET,
    SET,
    STATUS,
    UPDATE,
    USERS,
    PREVIOUS,
    END,
    ALL_IDS,
    REMOVE,
    DELETE,
    LOADING_DELETE,
} from '#store/genericActionTypes';

export const USERS_ALL_IDS_REMOVE = `${USERS}${ALL_IDS} ${REMOVE}`;
export const USERS_ALL_IDS_RESET = `${USERS}${ALL_IDS} ${RESET}`;
export const USERS_ALL_IDS_SET = `${USERS}${ALL_IDS} ${SET}`;
export const USERS_BY_ID_SET = `${USERS}${BY_ID} ${SET}`;
export const USERS_BY_ID_RESET = `${USERS}${BY_ID} ${RESET}`;
export const USERS_BY_ID_UPDATE = `${USERS}${BY_ID} ${UPDATE}`;
export const USERS_CURRENT_RESET = `${USERS}${CURRENT} ${RESET}`;
export const USERS_CURRENT_UPDATE = `${USERS}${CURRENT} ${UPDATE}`;
export const USERS_DELETE = `${USERS} ${DELETE}`;
export const USERS_END_RESET = `${USERS}${END} ${RESET}`;
export const USERS_END_UPDATE = `${USERS}${END} ${UPDATE}`;
export const USERS_GET = `${USERS} ${GET}`;
export const USERS_LOADING_DELETE_RESET = `${USERS}${LOADING_DELETE} ${RESET}`;
export const USERS_LOADING_DELETE_UPDATE = `${USERS}${LOADING_DELETE} ${UPDATE}`;
export const USERS_PREVIOUS_RESET = `${USERS}${PREVIOUS} ${RESET}`;
export const USERS_PREVIOUS_UPDATE = `${USERS}${PREVIOUS} ${UPDATE}`;
export const USERS_RESET = `${USERS} ${RESET}`;
export const USERS_STATUS_RESET = `${USERS}${STATUS} ${RESET}`;
export const USERS_STATUS_UPDATE = `${USERS}${STATUS} ${UPDATE}`;
