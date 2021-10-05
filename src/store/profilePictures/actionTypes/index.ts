import {
    ALL_IDS,
    BY_ID,
    CURRENT,
    DELETE,
    END,
    GET,
    ID,
    LOADING_DELETE,
    LOADING_POST,
    POST,
    PREVIOUS,
    PROFILE_PICTURES,
    REMOVE,
    RESET,
    SET,
    STATUS,
    UPDATE,
} from '#store/genericActionTypes';

export const PROFILE_PICTURES_ALL_ID_REMOVE = `${PROFILE_PICTURES}${ALL_IDS} ${REMOVE}`;
export const PROFILE_PICTURES_ALL_ID_RESET = `${PROFILE_PICTURES}${ALL_IDS} ${RESET}`;
export const PROFILE_PICTURES_ALL_ID_SET = `${PROFILE_PICTURES}${ALL_IDS} ${SET}`;
export const PROFILE_PICTURES_BY_ID_REMOVE = `${PROFILE_PICTURES}${BY_ID} ${REMOVE}`;
export const PROFILE_PICTURES_BY_ID_RESET = `${PROFILE_PICTURES}${BY_ID} ${RESET}`;
export const PROFILE_PICTURES_BY_ID_SET = `${PROFILE_PICTURES}${BY_ID} ${SET}`;
export const PROFILE_PICTURES_CURRENT_RESET = `${PROFILE_PICTURES}${CURRENT} ${RESET}`;
export const PROFILE_PICTURES_CURRENT_UPDATE = `${PROFILE_PICTURES}${CURRENT} ${SET}`;
export const PROFILE_PICTURES_DELETE = `${PROFILE_PICTURES} ${DELETE}`;
export const PROFILE_PICTURES_END_RESET = `${PROFILE_PICTURES}${END} ${RESET}`;
export const PROFILE_PICTURES_END_UPDATE = `${PROFILE_PICTURES}${END} ${UPDATE}`;
export const PROFILE_PICTURES_GET = `${PROFILE_PICTURES} ${GET}`;
export const PROFILE_PICTURES_ID_REMOVE = `${PROFILE_PICTURES}${ID} ${REMOVE}`;
export const PROFILE_PICTURES_ID_RESET = `${PROFILE_PICTURES}${ID} ${RESET}`;
export const PROFILE_PICTURES_ID_UPDATE = `${PROFILE_PICTURES}${ID} ${UPDATE}`;
export const PROFILE_PICTURES_LOADING_DELETE_RESET = `${PROFILE_PICTURES}${LOADING_DELETE} ${RESET}`;
export const PROFILE_PICTURES_LOADING_DELETE_UPDATE = `${PROFILE_PICTURES}${LOADING_DELETE} ${UPDATE}`;
export const PROFILE_PICTURES_LOADING_POST_RESET = `${PROFILE_PICTURES}${LOADING_POST} ${RESET}`;
export const PROFILE_PICTURES_LOADING_POST_UPDATE = `${PROFILE_PICTURES}${LOADING_POST} ${UPDATE}`;
export const PROFILE_PICTURES_POST = `${PROFILE_PICTURES} ${POST}`;
export const PROFILE_PICTURES_PREVIOUS_RESET = `${PROFILE_PICTURES}${PREVIOUS} ${RESET}`;
export const PROFILE_PICTURES_PREVIOUS_UPDATE = `${PROFILE_PICTURES}${PREVIOUS} ${UPDATE}`;
export const PROFILE_PICTURES_RESET = `${PROFILE_PICTURES} ${RESET}`;
export const PROFILE_PICTURES_STATUS_RESET = `${PROFILE_PICTURES}${STATUS} ${RESET}`;
export const PROFILE_PICTURES_STATUS_UPDATE = `${PROFILE_PICTURES}${STATUS} ${UPDATE}`;
