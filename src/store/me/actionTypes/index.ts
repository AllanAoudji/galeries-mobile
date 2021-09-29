import {
    DELETE,
    ME,
    GET,
    ID,
    PUT,
    RESET,
    STATUS,
    UPDATE,
} from '#store/genericActionTypes';

export const ME_DELETE = `${ME} ${DELETE}`;
export const ME_GET = `${ME} ${GET}`;
export const ME_ID_RESET = `${ME}${ID} ${RESET}`;
export const ME_ID_UPDATE = `${ME}${ID} ${UPDATE}`;
export const ME_PUT = `${ME} ${PUT}`;
export const ME_RESET = `${ME} ${RESET}`;
export const ME_STATUS_RESET = `${ME}${STATUS} ${RESET}`;
export const ME_STATUS_UPDATE = `${ME}${STATUS} ${UPDATE}`;
