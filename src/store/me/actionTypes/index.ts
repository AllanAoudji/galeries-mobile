import {
    DELETE,
    ME,
    GET,
    ID,
    PUT,
    RESET,
    STATUS,
    UPDATE,
    LOADING_PUT,
    FIELDS_ERROR,
} from '#store/genericActionTypes';

export const ME_DELETE = `${ME} ${DELETE}`;
export const ME_FIELDS_ERROR_RESET = `${ME}${FIELDS_ERROR} ${RESET}`;
export const ME_FIELDS_ERROR_UPDATE = `${ME}${FIELDS_ERROR} ${UPDATE}`;
export const ME_GET = `${ME} ${GET}`;
export const ME_ID_RESET = `${ME}${ID} ${RESET}`;
export const ME_ID_UPDATE = `${ME}${ID} ${UPDATE}`;
export const ME_LOADING_PUT_RESET = `${ME}${LOADING_PUT} ${RESET}`;
export const ME_LOADING_PUT_UPDATE = `${ME}${LOADING_PUT} ${UPDATE}`;
export const ME_PUT = `${ME} ${PUT}`;
export const ME_RESET = `${ME} ${RESET}`;
export const ME_STATUS_RESET = `${ME}${STATUS} ${RESET}`;
export const ME_STATUS_UPDATE = `${ME}${STATUS} ${UPDATE}`;
